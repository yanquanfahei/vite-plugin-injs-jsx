const fs = require('fs')
const { win32, posix } = require('path')
const transformJsx = require('./transformJsx')

function normalizePath(filename) {
  return filename.split(win32.sep).join(posix.sep);
}

function isTransform(include, id) {
  if(!include.length) return true
  return include.some(filename => normalizePath(id).indexOf(normalizePath(filename)) >= 0)
}

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