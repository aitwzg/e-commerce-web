// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')
module.exports = {
  // lintOnSave:false

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less'),
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    config.devServer.disableHostCheck(true)
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}