const { resolve } = require('path')

module.exports = {
  mode: 'spa',
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../../') }
  ],
  env: {
    server: {
      ONLY_SERVER: 'yup',
      DIFFERENT: 'server'
    },
    client: {
      ONLY_CLIENT: 'okay',
      DIFFERENT: 'client'
    },
    normal: 'Hi'
  }
}
