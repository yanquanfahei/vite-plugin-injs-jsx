const { transform } = require('@babel/core')

module.exports = function transformJsx(code, id, jsxOptions, babelrc = {}) {
  const { presets: newPresets, plugins: newPlugins } = babelrc
  let presets = [[require.resolve('@vue/babel-preset-jsx'), jsxOptions]]
  let plugins = []

  if(newPresets) {
    presets = newPresets
  }

  if(plugins) {
    plugins = newPlugins
  }

  const result = transform(code, {
    presets,
    sourceFileName: id,
    filename: id,
    sourceMaps: true,
    plugins,
    babelrc: false,
    configFile: false
  })

  return {
    code: result.code,
    map: result.map
  }
}