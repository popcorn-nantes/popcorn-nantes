require("dotenv").config();
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
const views = nunjucks.configure("views", { autoescape: false });

views.addGlobal("SITE_NAME", config.SITE_NAME);
views.addGlobal("SITE_BASE_URL", process.env.SITE_BASE_URL);

const BUILD_DIRECTORY = "_site";
const STATIC_DIRECTORY = "static";

/**
 * BUILD STATIC SITE
 */
build();

function build() {
  // delete and recreate BUILD directory
  rimraf.sync(path.resolve(`./${BUILD_DIRECTORY}`));
  fs.mkdirSync(`./${BUILD_DIRECTORY}`);

  // copy all files and directories from /static diretory to build directory
  fsExtra.copySync(
    path.resolve(`./${STATIC_DIRECTORY}`),
    path.resolve(`./${BUILD_DIRECTORY}`),
    {
      recursive: true,
    }
  );

  // create html files from markdown files
  buildPages();
  buildPersons();

  // compiled and purge tailwind.css
  const purgecssConfig = {
    content: ["views/**/*.njk"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  };
  postcssRun("./static/app.css", "./_site/app.css", purgecssConfig);

  // resize and compress .jpeg & .png images for homepage listing,
  // and create .webp versions of photos.
  fs.mkdirSync(`./${BUILD_DIRECTORY}/media/thumbnails`, { recursive: true });
  fs.readdirSync(`./${BUILD_DIRECTORY}/media/photos`).forEach(function (
    filename
  ) {
    sharp(`./${BUILD_DIRECTORY}/media/photos/` + filename)
      .png({ compression: 9 })
      .jpeg({ progressive: true, quality: 80 })
      .resize(300)
      .toFile(`./${BUILD_DIRECTORY}/media/thumbnails/` + filename)
      .then(() => {
        // create webp version
        let basename = filename.replace(/\.[^/.]+$/, "");
        sharp(`./${BUILD_DIRECTORY}/media/photos/` + filename).toFile(
          `./${BUILD_DIRECTORY}/media/thumbnails/` + basename + ".webp"
        );
      });
  });
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
  resources = resources.map((resource) => ({
    ...resource,
    // will be user to build search index for the search engine.
    $search_keywords: [
      ...resource.domaines_metiers,
      ...resource.technologies,
      resource.titre,
    ],
    photoWebp: resource.photo.replace(/\.[^/.]+$/, "") + ".webp",
    mail: Buffer.from(resource.mail).toString("base64"),
    telephone: resource.telephone
      ? Buffer.from(resource.telephone.toString()).toString("base64")
      : "",
  }));

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
}
