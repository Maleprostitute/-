module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      moment: 'moment'
    }
  }
}
