// L'URL de production sert de valeur par défaut : les pull requests venant
// d'un fork n'ont pas accès aux secrets du dépôt, et une base d'URL vide
// produirait un sitemap et des balises canoniques invalides sans que la CI
// ne s'en aperçoive.
const DEFAULT_SITE_BASE_URL = "https://popcorn-nantes.github.io";

module.exports = {
  SITE_NAME: "Popcorn Nantes",
  // sans slash final : les chemins ajoutés derrière commencent par un slash.
  SITE_BASE_URL: (process.env.SITE_BASE_URL || DEFAULT_SITE_BASE_URL).replace(
    /\/+$/,
    ""
  ),
};
