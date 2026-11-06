const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");
const { minify } = require("html-minifier-terser");

const MINIFY_OPTIONS = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  // ne pas toucher aux balises nunjucks
  ignoreCustomFragments: [/\{%[^}]+%\}/],
};

// html-minifier-terser est asynchrone alors que les loaders nunjucks sont
// synchrones : on minifie tous les templates au démarrage, puis le loader
// sert la version minifiée depuis ce cache.
class MinifyLoader extends nunjucks.FileSystemLoader {
  constructor(searchPath) {
    super(searchPath);
    this.root = path.resolve(searchPath);
    this.minified = new Map();
  }

  async prepare() {
    const files = fs
      .readdirSync(this.root, { recursive: true })
      .filter((file) => file.endsWith(".njk"));
    await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(this.root, file);
        const src = fs.readFileSync(fullPath, "utf-8");
        this.minified.set(fullPath, await minify(src, MINIFY_OPTIONS));
      })
    );
  }

  getSource(name) {
    const result = super.getSource(name);
    if (!result) return null;
    if (!this.minified.has(result.path)) {
      throw new Error(`template non minifié : ${result.path}`);
    }
    result.src = this.minified.get(result.path);
    return result;
  }
}

module.exports = MinifyLoader;
