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
    extend (config) {
      const DefinePlugin = config.plugins.find(p => p.constructor.name === 'DefinePlugin')
      Object.assign(DefinePlugin.definitions, { 'process.env.ONLY_SERVER': JSON.stringify('nope') })
    }
  }
}
