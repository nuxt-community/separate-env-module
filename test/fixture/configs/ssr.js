const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  buildDir: resolve(__dirname, '../.nuxt'),
  srcDir: resolve(__dirname, '..'),
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../../') }
  ],
  env: {
    server: {
      ONLY_SERVER: 'yup',
      DIFFERENT: 'server',
      SECRET: 'nowhereIncluded'
    },
    client: {
      ONLY_CLIENT: 'okay',
      DIFFERENT: 'client'
    },
    normal: 'Hi',
    number: 10
  }
}
