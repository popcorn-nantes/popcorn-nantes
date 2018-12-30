# CONTENT COMPILERS

Transforme les fichiers du dossier `content` en fichiers JSON qui seront stockés dans le dossier `static/api`. Ce sont ces fichiers JSON qui seront ensuite consommés par nos composants Vue.

La commande `npm run cc` permet d'éxécuter ces scripts. Ils sont également automatiquement appelés lors d'une recompilation webpack pendant le développement (voir le module `modules/ContentCompiler`)
