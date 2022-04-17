const fs = require('fs')
const transformJsx = require('./transformJsx')
const path = require('path')

/**
 * @type {import(".").VitePluginInJsJsx}
 */
module.exports = function transformJsxInJs(options = {}) {
  const name = 'vite-plugin-injs-jsx'
  const { include = [], jsxOptions, babelrc } = options
  return {
    name,
    config(config) {
      if(!config.optimizeDeps) config.optimizeDeps = {}
      if(!config.optimizeDeps.esbuildOptions)
        config.optimizeDeps.esbuildOptions = {}
      if(!config.optimizeDeps.esbuildOptions.plugins)
        config.optimizeDeps.esbuildOptions.plugins = []

      config.optimizeDeps.esbuildOptions.plugins.push({
        name: 'esbuild:jsx',
        setup(build) {
          build.onLoad({ filter: /\.js$/ }, (args) => {
            const contents = fs.readFileSync(args.path, 'utf8')
            return {
              loader: 'jsx',
              contents
            }
          })
        }
      })
    },
    transform(code, id) {
      if(/\.js$/.test(id) && isTransform(include, id)) {
        return transformJsx(code, id, jsxOptions, babelrc)
      }
    }
  }
}

function isTransform(include, id) {
  return include.some(item => id.endsWith(item))
}