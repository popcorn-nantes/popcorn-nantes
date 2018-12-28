import { runCompilers } from './lib'

export default function ContentCompiler(test) {
  // hello world
  this.nuxt.hook('build:compile', ({ name, compiler }) => {
    if (name == 'server') {
      runCompilers()
    }
  })
}
