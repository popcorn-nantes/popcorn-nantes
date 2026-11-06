/**
 * Normalisation des noms de technologies.
 *
 * Les profils sont écrits à la main : la même technologie y est orthographiée
 * de plusieurs façons ("react", "React.js", "reactjs"). Sans normalisation, une
 * page /tech/react ne listait que les profils écrivant exactement "react" et
 * ignorait les autres.
 *
 * Pour ajouter une variante : ajoute-la dans le tableau d'alias de la
 * technologie concernée, en minuscules. Une technologie sans variante n'a
 * pas besoin d'entrée : elle est simplement passée en minuscules.
 */

const ALIASES = {
  javascript: ["js", "java script", "ecmascript"],
  typescript: ["ts"],
  react: ["react.js", "reactjs", "react js"],
  "react native": ["react-native", "reactnative"],
  vue: ["vue.js", "vuejs", "vue js"],
  nuxt: ["nuxt.js", "nuxtjs"],
  next: ["next.js", "nextjs", "next js"],
  node: ["node.js", "nodejs", "node js"],
  angular: ["angular.js", "angularjs", "angular js"],
  wordpress: ["word press"],
  "ruby on rails": ["rails", "rubyonrails", "ror"],
  spring: ["spring boot", "springboot", "spring / spring boot"],
  golang: ["go", "go lang"],
  "c#": ["csharp", "c sharp", ".net", "dotnet"],
  "c++": ["cpp", "c/c++"],
  "objective c": ["objective-c", "objectivec"],
  html: ["html5", "html 5"],
  css: ["css3", "css 3", "html/css", "html / css", "html5 / css", "html5/css"],
  sass: ["scss"],
  "tailwind css": ["tailwindcss", "tailwind"],
  nestjs: ["nest.js", "nest js"],
  express: ["expressjs", "express.js", "express js"],
  postgresql: ["postgres", "postgre", "psql"],
  mongodb: ["mongo", "mongo db"],
  elasticsearch: ["elastic search", "elastic"],
  kubernetes: ["k8s"],
  gitlab: ["gitlab ci"],
  aws: ["amazon web services"],
  gcp: ["google cloud platform", "google cloud"],
  "ci/cd": ["ci-cd", "cicd", "intégration continue"],
};

/**
 * alias en minuscules -> nom canonique
 */
const ALIAS_TO_CANONICAL = new Map();
Object.entries(ALIASES).forEach(([canonical, aliases]) => {
  [canonical, ...aliases].forEach((name) => {
    // Sans ce garde-fou, déclarer deux fois le même nom (par exemple "react"
    // en alias de "react native") écraserait silencieusement le premier :
    // /tech/react se retrouverait vide, sans que rien n'échoue.
    const existing = ALIAS_TO_CANONICAL.get(name);
    if (existing && existing !== canonical) {
      throw new Error(
        `technologies.js : "${name}" est déclaré à la fois pour "${existing}" et "${canonical}".`
      );
    }
    ALIAS_TO_CANONICAL.set(name, canonical);
  });
});

/**
 * Ramène un nom de technologie écrit à la main à sa forme canonique.
 * Une technologie inconnue de la table est simplement passée en minuscules,
 * ce qui garde le comportement précédent pour tout le reste.
 *
 * @param {string} technology
 * @returns {string} le nom canonique, en minuscules
 */
function normalizeTechnology(technology) {
  if (typeof technology !== "string") {
    return "";
  }
  const cleaned = technology.toLowerCase().trim();
  return ALIAS_TO_CANONICAL.get(cleaned) || cleaned;
}

/**
 * Les valeurs saisies dans les profils ne sont pas toujours des tableaux
 * (un profil a renseigné une chaîne). Renvoie toujours un tableau de chaînes.
 *
 * @param {*} value
 * @returns {string[]}
 */
function toArray(value) {
  if (!value) {
    return [];
  }
  const values = Array.isArray(value) ? value : [value];
  return values.filter((item) => typeof item === "string");
}

module.exports = {
  normalizeTechnology,
  toArray,
};
