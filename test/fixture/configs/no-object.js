const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../../') }
  ],
  env: {
    server: 'no object',
    normal: 'Hi'
  }
}
