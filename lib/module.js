import consola from 'consola'

const logger = consola.withScope('nuxt:separate-env')

export default function separateEnv() {
  const { server, client, ...env } = this.nuxt.options.env
  // Set all other env variables except nested server/clients
  this.nuxt.options.env = env

  const assignEnvVariables = function (config, { isServer }) {
    logger.debug(`Assigning ${isServer ? 'server' : 'client'} env variables now`)

    let definitionsToAdd = isServer ? server : client

    if (typeof definitionsToAdd === 'undefined') {
      // No definitions for server/client provided on purpose
      return
    }

    if (typeof definitionsToAdd === 'function') {
      definitionsToAdd = definitionsToAdd()
    }

    if (typeof definitionsToAdd !== 'object') {
      logger.error(`Could not assign ${isServer ? 'server' : 'client'} env variables. Please provide an object or a function that returns an object!`)
      return
    }

    const DefinePlugin = config.plugins.find(p => p.constructor.name === 'DefinePlugin')
    const definitionsToAddWithPrefix = applyPrefix(definitionsToAdd)

    Object.assign(DefinePlugin.definitions, definitionsToAddWithPrefix)
  }

  const oldExtendFunction = this.options.build.extend

  this.options.build.extend = (...args) => {
    assignEnvVariables(...args)
    if (oldExtendFunction) {
      oldExtendFunction(...args)
    }
  }
}

function applyPrefix(definitionsToAdd) {
  return Object.entries(definitionsToAdd).reduce((newObject, [key, value]) => {
    // Logic from https://github.com/nuxt/nuxt.js/blob/820f0fae1a94793a2b9cf75e398531ab77e5bc8c/lib/builder/webpack/base.js#L70
    newObject[`process.env.${key}`] = ['boolean', 'number'].includes(typeof value)
      ? value
      : JSON.stringify(value)
    return newObject
  }, {})
}

module.exports.meta = require('../package.json')
