const { resolve } = require('path')

module.exports = {
  dev: true,
  rootDir: resolve(__dirname, '../../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../../') }
  ],
  env: {
    server: () => ({
      ONLY_SERVER: 'yup',
      DIFFERENT: 'server',
      SECRET: 'nowhereIncluded'
    }),
    client: {
      ONLY_CLIENT: 'okay',
      DIFFERENT: 'client'
    },
    normal: 'Hi'
  }
}
