const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: ['@@'],
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
    normal: 'Hi'
  }
}
