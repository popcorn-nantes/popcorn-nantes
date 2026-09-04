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
const FileMinifyLoader = require("nunjucks-minify-loaders").FileMinifyLoader;

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

const opts = {
  minify: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
  },
};
const loader = new FileMinifyLoader("views", opts);
const views = new nunjucks.Environment(loader, {
  autoescape: false,
});

views.addGlobal("SITE_NAME", config.SITE_NAME);
views.addGlobal("SITE_BASE_URL", process.env.SITE_BASE_URL);
views.addGlobal("ENABLE_ANALYTICS", process.env.ENABLE_ANALYTICS);
views.addGlobal(
  "CONTACT_ALL_FREELANCES_FORM_LINK",
  process.env.CONTACT_ALL_FREELANCES_FORM_LINK
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

  // create html files from markdown files
  buildPages();
  console.log("📝 pages markdown files compiled to html.");

  const persons = buildPersons();
  console.log("📝 persons markdown files compiled html.");

  buildTechPages(persons);
  console.log("📝 technologies pages compiled to html");

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
          fsExtra.copySync(cachePath, `${thumbnailsDirectory}/${thumbnailName}`);
        })
      );
    });
  });

  await Promise.all(thumbnailPromises);
  return { imageCount, cachedCount: cachedCount / 2, totalWebpSize, totalJpegSize };
}

function buildPages() {
  let entities = parseMarkdownDirectory("./content/pages");
  entities.forEach((entity) => {
    const html = views.render("page.njk", { entity });
    fsExtra.outputFile(
      `./${BUILD_DIRECTORY}/page/${entity.$slug}/index.html`,
      html
    );
  });
}

function buildPersons() {
  let resources = parseMarkdownDirectory("./content/persons");
  resources.forEach((resource) => {
    const photoExtension = path.extname(resource.photo);
    const photoBasename = resource.photo.replace(photoExtension, "");
    // will be user to build search index for the search engine.
    resource.$search_keywords = [
      ...resource.domaines_metiers,
      ...resource.technologies,
      resource.titre,
      resource.prenom,
      resource.nom,
      `${resource.prenom} ${resource.nom}`,
    ].filter(Boolean);
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
 * Persons as returned by buildPersons()
 */
function buildTechPages(persons) {
  let entities = parseMarkdownDirectory("./content/technologies");
  entities.forEach((entity) => {
    let personsMatched = [];
    entity.technologies.forEach((technology) => {
      persons.forEach((person) => {
        person.technologies.forEach((personTechnology) => {
          if (personTechnology.toLowerCase() === technology.toLowerCase()) {
            personsMatched.push(person);
          }
        });
      });
    });

    const html = views.render("tech.njk", { entity, persons: personsMatched });
    fsExtra.outputFile(
      `./${BUILD_DIRECTORY}/tech/${entity.$slug}/index.html`,
      html
    );
  });
}
