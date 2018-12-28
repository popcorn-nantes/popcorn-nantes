import { runCompilers } from './lib'

export default function ContentCompiler({ compilersDirectory }) {
  // recompiler les fichiers JSON lors de la recompilation, pour éviter
  // d'avoir à faire manuellement un "npm run cc" à chaque fois qu'on
  // modifie un fichier markdown.
  this.nuxt.hook('build:compile', ({ name }) => {
    if (name == 'server') {
      runCompilers(compilersDirectory)
    }
  })
}
