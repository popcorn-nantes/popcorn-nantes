# Gustave

`nuxt.config.js`:

```js
module.exports = {
  // ...
  gustave: {
    compilers: [
      {
        file: '~/compilers/pages.js',
        options: {}
      }
    ]
  }
}
```

`compilers/pages.js`:

```js
module.exports.compile = () => {
  const entities = parseMarkdownDirectory('content/pages')
  saveAsJson('static/api/pages.json', entities)
  return { routes: entities.map(e => `/page/${e.slug}`) }
}
```
