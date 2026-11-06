require("dotenv").config({ quiet: true });
const config = require("./config");
const nunjucks = require("nunjucks");
const fs = require("fs");
const fsExtra = require("fs-extra");
const sharp = require("sharp");
const path = require("path");
const rimraf = require("rimraf");
const {
  postcssRun,
  parseMarkdownDirectory,
  shuffle,
} = require("./utils/helpers.js");
const { normalizeTechnology, toArray } = require("./utils/technologies.js");
const MinifyLoader = require("./utils/minifyLoader.js");

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

const loader = new MinifyLoader("views");
// autoescape: les profils sont ouverts en pull request, un "&" ou un "<" dans
// un titre ne doit pas pouvoir casser les balises meta ou le JSON-LD.
// Le markdown déjà rendu s'affiche avec le filtre `| safe`.
const views = new nunjucks.Environment(loader, {
  autoescape: true,
});

/**
 * Chemin interne d'une page, slash final compris.
 *
 * Le build écrit des `index.html` dans des dossiers : GitHub Pages redirige
 * `/person/foo` (301) vers `/person/foo/`. Sans ce slash, chaque URL annoncée
 * dans le sitemap et dans les balises canoniques pointerait vers une
 * redirection, que Google signale comme "page avec redirection, non indexée".
 *
 * @param {...string} segments
 * @returns {string} par exemple "/person/fabien-juif/", ou "/" sans segment
 */
function sitePath(...segments) {
  if (segments.length === 0) {
    return "/";
  }
  return `/${segments.join("/")}/`;
}

/**
 * @param {string} pathname un chemin produit par sitePath()
 * @returns {string} l'URL absolue correspondante
 */
function siteUrl(pathname) {
  return `${config.SITE_BASE_URL}${pathname}`;
}

views.addGlobal("SITE_NAME", config.SITE_NAME);
views.addGlobal("SITE_BASE_URL", config.SITE_BASE_URL);
views.addGlobal("ENABLE_ANALYTICS", process.env.ENABLE_ANALYTICS);
views.addGlobal(
  "CONTACT_ALL_FREELANCES_FORM_LINK",
  process.env.CONTACT_ALL_FREELANCES_FORM_LINK
);

// Sérialise des données structurées pour une balise <script type="ld+json">.
// Le contenu vient de fichiers markdown ouverts en pull request : on échappe
// "<" pour qu'un profil ne puisse pas refermer la balise script.
views.addFilter(
  "jsonld",
  (data) =>
    new nunjucks.runtime.SafeString(
      JSON.stringify(data).replace(/</g, "\\u003c")
    )
);

// construire un tableau d'objets est pénible en nunjucks : le fil d'Ariane
// passe par ici pour produire ses données structurées.
views.addGlobal("breadcrumbItems", (items) =>
  items.map((item, position) => ({
    "@type": "ListItem",
    position: position + 1,
    name: item.name,
    item: siteUrl(item.url),
  }))
);

const BUILD_DIRECTORY = "_site";
const STATIC_DIRECTORY = "static";
const CACHE_DIRECTORY = "./.cache/thumbnails";

/**
 * BUILD STATIC SITE
 */
build();

async function build() {
  const buildPromises = [];

  await loader.prepare();

  rimraf.sync(path.resolve(`./${BUILD_DIRECTORY}`));
  fs.mkdirSync(`./${BUILD_DIRECTORY}`);
  console.log(`📁 deleted & recreated ${BUILD_DIRECTORY} directory`);

  // copy all files and directories from /static diretory to build directory
  fsExtra.copySync(
    path.resolve(`./${STATIC_DIRECTORY}`),
    path.resolve(`./${BUILD_DIRECTORY}`),
    {
      recursive: true,
    }
  );
  console.log(`📁 static directory copied to ${BUILD_DIRECTORY} directory`);

  // les pages technologies sont lues en premier : les fiches profil ont besoin
  // de savoir quelles pages existent pour pouvoir pointer vers elles.
  const technologies = parseMarkdownDirectory("./content/technologies");
  const technologyIndex = buildTechnologyIndex(technologies);

  // le pied de page liste toutes les pages technologies : en dur, toute
  // nouvelle page resterait orpheline.
  views.addGlobal(
    "TECHNOLOGY_PAGES",
    technologies.map((entity) => ({
      url: sitePath("tech", entity.$slug),
      title: entity.title,
    }))
  );

  // create html files from markdown files
  const pages = buildPages();
  console.log("📝 pages markdown files compiled to html.");

  const persons = buildPersons(technologyIndex);
  console.log("📝 persons markdown files compiled html.");

  buildTechPages(technologies, persons);
  console.log("📝 technologies pages compiled to html");

  buildNotFoundPage();
  console.log("📝 404 page compiled to html");

  buildSitemap({ pages, persons, technologies });
  console.log("🔎 sitemap.xml & robots.txt written");

  // compiled and purge tailwind.css
  console.log("🎨 starting postcss & purgecss ...");
  const purgecssConfig = {
    content: ["views/**/*.njk"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  };
  buildPromises.push(
    postcssRun("./static/app.css", "./_site/app.css", purgecssConfig).then(
      (r) => {
        console.log("🎨 postcss & purgecss done.");
      }
    )
  );

  console.log("🖼️  starting images resizing and compression...");
  buildPromises.push(
    imagesOptimize().then((result) => {
      const { imageCount, cachedCount, totalWebpSize, totalJpegSize } = result;
      console.log(
        `🖼️  images compression done: ${imageCount} images resized (${cachedCount} from cache). Total webp thumbnails size: ${Math.ceil(
          totalWebpSize / 1000
        )}Ko. Total Jpeg thumbnails size: ${Math.ceil(
          totalJpegSize / 1000
        )}Ko  `
      );
    })
  );
  return Promise.all(buildPromises).then((r) => {
    console.log("✨ All build operations finished");
  });
}

// resize and compress .jpeg & .png images for homepage listing,
// and create .webp versions of photos.
// Thumbnails are cached outside of the build directory (which is wiped at each
// build) and only regenerated when the source photo is newer, so that repeated
// builds - and dev builds in particular - stay fast.
async function imagesOptimize() {
  // read from the static directory: copying into the build directory resets
  // the modification times, which the cache relies on.
  const photosDirectory = `./${STATIC_DIRECTORY}/media/photos`;
  const thumbnailsDirectory = `./${BUILD_DIRECTORY}/media/thumbnails`;
  fs.mkdirSync(thumbnailsDirectory, { recursive: true });
  fs.mkdirSync(CACHE_DIRECTORY, { recursive: true });
  let totalWebpSize = 0;
  let totalJpegSize = 0;
  let imageCount = 0;
  let cachedCount = 0;
  const thumbnailPromises = [];

  fs.readdirSync(photosDirectory).forEach(function (filename) {
    imageCount++;
    const extension = path.extname(filename);
    const basename = filename.replace(extension, "");
    const photoPath = `${photosDirectory}/${filename}`;
    const photoModifiedAt = fs.statSync(photoPath).mtimeMs;

    // webp for browsers that support it, jpeg fallback for safari.
    ["webp", "jpeg"].forEach((format) => {
      const thumbnailName = `${basename}.${format}`;
      const cachePath = `${CACHE_DIRECTORY}/${thumbnailName}`;
      const isCached =
        fs.existsSync(cachePath) &&
        fs.statSync(cachePath).mtimeMs >= photoModifiedAt;
      if (isCached) cachedCount++;

      const thumbnail = isCached
        ? Promise.resolve(fs.statSync(cachePath).size)
        : sharp(photoPath)
            .rotate() // applique l'orientation EXIF, sinon les photos prises au téléphone sortent couchées
            .resize(300)
            .toFile(cachePath)
            .then((info) => info.size);

      thumbnailPromises.push(
        thumbnail.then((size) => {
          if (format === "webp") totalWebpSize += size;
          else totalJpegSize += size;
          fsExtra.copySync(
            cachePath,
            `${thumbnailsDirectory}/${thumbnailName}`
          );
        })
      );
    });
  });

  await Promise.all(thumbnailPromises);
  return {
    imageCount,
    cachedCount: cachedCount / 2,
    totalWebpSize,
    totalJpegSize,
  };
}

function buildPages() {
  let entities = parseMarkdownDirectory("./content/pages");
  entities.forEach((entity) => {
    // certaines pages ouvrent déjà leur markdown par un titre de niveau 1,
    // le template ne doit pas en ajouter un second.
    entity.$hasH1 = /<h1[\s>]/.test(entity.$html);
    entity.$path = sitePath("page", entity.$slug);
    // une page peut désigner une autre page comme version de référence :
    // deux URLs pour le même contenu se neutralisent l'une l'autre.
    entity.$url = entity.canonical
      ? siteUrl(entity.canonical)
      : siteUrl(entity.$path);
    const html = views.render("page.njk", { entity });
    fsExtra.outputFile(
      `./${BUILD_DIRECTORY}/page/${entity.$slug}/index.html`,
      html
    );
  });
  return entities;
}

/**
 * Associe chaque technologie canonique à la page /tech/... qui la présente,
 * pour pouvoir lier les technologies d'un profil vers ces pages.
 *
 * @param {Array} technologies entités lues depuis content/technologies
 * @returns {Map<string, string>} technologie canonique -> chemin de la page
 */
function buildTechnologyIndex(technologies) {
  const index = new Map();
  technologies.forEach((entity) => {
    toArray(entity.technologies).forEach((technology) => {
      index.set(
        normalizeTechnology(technology),
        sitePath("tech", entity.$slug)
      );
    });
  });
  return index;
}

function buildPersons(technologyIndex) {
  let resources = parseMarkdownDirectory("./content/persons");
  resources.forEach((resource) => {
    // Les vignettes sont nommées d'après le nom de fichier sans extension :
    // une extension erronée passait inaperçue sur la page d'accueil tout en
    // laissant la photo de la fiche profil en 404. On échoue au build plutôt
    // que de publier un profil sans photo.
    const photoPath = `./${STATIC_DIRECTORY}/media/photos/${resource.photo}`;
    if (!resource.photo || !fs.existsSync(photoPath)) {
      throw new Error(
        `${resource.$filename} : la photo "${resource.photo}" est introuvable dans ${STATIC_DIRECTORY}/media/photos/`
      );
    }

    const photoExtension = path.extname(resource.photo);
    const photoBasename = resource.photo.replace(photoExtension, "");
    const technologies = toArray(resource.technologies);
    const domaines = toArray(resource.domaines_metiers);
    // will be user to build search index for the search engine.
    // la recherche par nom et prénom vient de master ; les listes passent par
    // toArray car un profil peut avoir saisi une chaîne au lieu d'un tableau,
    // que l'opérateur de décomposition éclaterait caractère par caractère.
    resource.$search_keywords = [
      ...domaines,
      ...technologies,
      resource.titre,
      resource.prenom,
      resource.nom,
      `${resource.prenom} ${resource.nom}`,
    ].filter(Boolean);

    resource.$path = sitePath("person", resource.$slug);
    resource.$url = siteUrl(resource.$path);
    // la liste normalisée sert aussi au JSON-LD : le YAML d'un profil n'est
    // pas garanti d'être un tableau.
    resource.$technologyNames = technologies;
    // chaque technologie qui dispose d'une page dédiée devient un lien :
    // c'est ce maillage qui fait remonter les pages /tech/...
    resource.$technologies = technologies.map((technology) => {
      return {
        name: technology,
        url: technologyIndex.get(normalizeTechnology(technology)) || null,
      };
    });

    // une description unique par profil, sinon les 160 fiches partagent la même
    // et Google n'en retient aucune.
    resource.$seoDescription = buildPersonDescription(
      resource,
      technologies,
      domaines
    );
    // those files will be created at build time.
    resource.photo = {
      default: `/media/photos/${resource.photo}`,
      thumbnailJpeg: `/media/thumbnails/${photoBasename}.jpeg`,
      thumbnailWebp: `/media/thumbnails/${photoBasename}.webp`,
    };
    resource.mail = Buffer.from(resource.mail).toString("base64");
    resource.telephone = resource.telephone
      ? Buffer.from(resource.telephone.toString()).toString("base64")
      : "";
  });

  // build a JSON index of person/keywords for the search engine
  const searchIndexJson = resources.map((resource) => ({
    id: resource.$slug,
    keywords: resource.$search_keywords,
  }));
  fsExtra.outputFile(
    `./${BUILD_DIRECTORY}/api/search-index.json`,
    JSON.stringify(searchIndexJson)
  );

  // create homepage.
  const html = views.render("index.njk", {
    persons: shuffle(resources),
  });
  fsExtra.outputFile(`./${BUILD_DIRECTORY}/index.html`, html);

  // create each person profile page
  resources.forEach((person) => {
    const personHtml = views.render("person.njk", {
      entity: person,
    });
    fsExtra.outputFile(
      `./${BUILD_DIRECTORY}/person/${person.$slug}/index.html`,
      personHtml
    );
  });
  return resources;
}

/**
 * "Jeanne Dupont, Développeuse JavaScript freelance à Nantes. React,
 *  Node, PostgreSQL. Sites web, applications mobiles. Contact direct,
 *  sans commission."
 */
function buildPersonDescription(person, technologies, domaines) {
  const parts = [
    `${person.prenom} ${person.nom}, ${person.titre} freelance à Nantes.`,
  ];
  if (technologies.length > 0) {
    parts.push(`${technologies.slice(0, 4).join(", ")}.`);
  }
  if (domaines.length > 0) {
    parts.push(`${domaines.slice(0, 3).join(", ")}.`);
  }
  parts.push("Contact direct, sans intermédiaire ni commission.");
  return parts.join(" ");
}

/**
 * @param {Array} entities entités lues depuis content/technologies
 * @param {Array} persons  persons as returned by buildPersons()
 */
function buildTechPages(entities, persons) {
  entities.forEach((entity) => {
    entity.$path = sitePath("tech", entity.$slug);
    entity.$url = siteUrl(entity.$path);
    const wanted = new Set(
      toArray(entity.technologies).map(normalizeTechnology)
    );
    // Set : un profil listant "React" et "React.js" ne doit apparaître qu'une fois.
    const personsMatched = persons.filter((person) =>
      toArray(person.technologies).some((personTechnology) =>
        wanted.has(normalizeTechnology(personTechnology))
      )
    );

    const html = views.render("tech.njk", { entity, persons: personsMatched });
    fsExtra.outputFile(
      `./${BUILD_DIRECTORY}/tech/${entity.$slug}/index.html`,
      html
    );
  });
}

function buildNotFoundPage() {
  const html = views.render("404.njk");
  fsExtra.outputFile(`./${BUILD_DIRECTORY}/404.html`, html);
}

/**
 * Un plan de site : sans lui, les 170+ URLs du site ne sont découvertes
 * que par le maillage interne.
 *
 * Volontairement sans <lastmod> : le site est reconstruit chaque matin par
 * un cron, la date du build vaudrait "modifié aujourd'hui" pour les 164 URLs
 * y compris des profils inchangés depuis deux ans. La date de modification
 * des fichiers ne vaut pas mieux, la CI repartant d'un clone neuf. Google
 * ignore un lastmod qu'il constate faux : autant ne rien annoncer.
 */
function buildSitemap({ pages, persons, technologies }) {
  const urls = [
    sitePath(),
    ...technologies.map((entity) => entity.$path),
    ...persons.map((person) => person.$path),
    // une page marquée noindex (un doublon canonicalisé, par exemple) n'a
    // rien à faire dans le plan de site.
    ...pages.filter((page) => !page.noindex).map((page) => page.$path),
  ];

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((pathname) =>
      ["  <url>", `    <loc>${siteUrl(pathname)}</loc>`, "  </url>"].join("\n")
    ),
    "</urlset>",
    "",
  ].join("\n");
  fsExtra.outputFile(`./${BUILD_DIRECTORY}/sitemap.xml`, sitemap);

  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl(sitePath())}sitemap.xml`,
    "",
  ].join("\n");
  fsExtra.outputFile(`./${BUILD_DIRECTORY}/robots.txt`, robots);
}
