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
      DIFFERENT: 'server'
    },
    client: {
      ONLY_CLIENT: 'okay',
      DIFFERENT: 'client'
    },
    normal: 'Hi'
  },
  build: {
    extend(config) {
      const DefinePlugin = config.plugins.find(p => p.constructor.name === 'DefinePlugin')
      Object.assign(DefinePlugin.definitions, { 'process.env.ONLY_SERVER': JSON.stringify('nope') })
    }
  }
}
