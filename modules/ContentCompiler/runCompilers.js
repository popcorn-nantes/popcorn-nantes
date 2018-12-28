/**
 * Script de compilation des fichiers markdowns appelé par "npm run cc"
 */
const { runCompilers } = require('./lib')
const compilersDirectory = process.argv[2]
runCompilers(compilersDirectory)
