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
views.addGlobal(
  "CONTACT_ALL_FREELANCES_FORM_LINK",
  process.env.CONTACT_ALL_FREELANCES_FORM_LINK
);

const BUILD_DIRECTORY = "_site";
const STATIC_DIRECTORY = "static";

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

  buildPersons();
  console.log("📝 persons markdown files compiled html.");

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

  // skip image optim in dev to get faster build times.
  if (process.env.NODE_ENV !== "development") {
    console.log("🖼️  starting images resizing and compression...");
    buildPromises.push(
      imagesOptimize().then((result) => {
        const { imageCount, totalWebpSize, totalJpegSize } = result;
        console.log(
          `🖼️  images compression done: ${imageCount} images resized. Total webp thumbnails size: ${Math.ceil(
            totalWebpSize / 1000
          )}Ko. Total Jpeg thumbnails size: ${Math.ceil(
            totalJpegSize / 1000
          )}Ko  `
        );
      })
    );
  }
  return Promise.all(buildPromises).then((r) => {
    console.log("✨ All build operations finished");
  });
}

// resize and compress .jpeg & .png images for homepage listing,
// and create .webp versions of photos.
async function imagesOptimize() {
  fs.mkdirSync(`./${BUILD_DIRECTORY}/media/thumbnails`, { recursive: true });
  let totalWebpSize = 0;
  let totalJpegSize = 0;
  let imageCount = 0;
  const sharpPromisesWebp = [];
  const sharpPromisesJpeg = [];
  fs.readdirSync(`./${BUILD_DIRECTORY}/media/photos`).forEach(function (
    filename
  ) {
    imageCount++;
    const extension = path.extname(filename);
    const basename = filename.replace(extension, "");

    // compress all image to webp
    sharpPromisesWebp.push(
      sharp(`./${BUILD_DIRECTORY}/media/photos/` + filename)
        .resize(300)
        .toFile(`./${BUILD_DIRECTORY}/media/thumbnails/${basename}.webp`)
        .then((info) => {
          totalWebpSize += info.size;
          return info;
        })
    );
    // jpeg fallback for safari, does not support webp.
    sharpPromisesJpeg.push(
      sharp(`./${BUILD_DIRECTORY}/media/photos/` + filename)
        .resize(300)
        .toFile(`./${BUILD_DIRECTORY}/media/thumbnails/${basename}.jpeg`)
        .then((info) => {
          totalJpegSize += info.size;
          return info;
        })
    );
  });
  await Promise.all([...sharpPromisesWebp, ...sharpPromisesJpeg]);
  return { imageCount, totalWebpSize, totalJpegSize };
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
    ];
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
}
