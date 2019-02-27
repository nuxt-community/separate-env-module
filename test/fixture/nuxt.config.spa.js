const { resolve } = require('path')

module.exports = {
  mode: 'spa',
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../') }
  ],
  env: {
    server: {
      ONLY_SERVER: 'yup',
      DIFFERENT: 'server',
      SECRET: 'nowhereIncluded',
      TYPE: true
    },
    client: {
      ONLY_CLIENT: 'okay',
      DIFFERENT: 'client',
      TYPE: 10
    },
    normal: 'Hi'
  }
}
