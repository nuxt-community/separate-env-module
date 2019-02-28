jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const logger = require('@/logger')
const getPort = require('get-port')

const config = require('./fixture/nuxt.config')

let nuxt, port

logger.mockTypes(() => jest.fn())

const url = path => `http://localhost:${port}${path}`

const setupNuxt = async (config) => {
  config.dev = true
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)

  return nuxt
}

describe('module', () => {
  afterEach(async () => {
    if (nuxt) {
      await nuxt.close()
    }
  })

  test('spa', async () => {
    nuxt = await setupNuxt(require('./fixture/nuxt.config.spa'))
    const window = await nuxt.renderAndGetWindow(url('/'))
    const html = window.document.body.innerHTML
    expect(html).toMatchSnapshot()
  })

  test('ssr', async () => {
    nuxt = await setupNuxt(config)
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('correctly assign env variables from function', async () => {
    nuxt = await setupNuxt({
      ...config,
      ...{
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
    })
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('honor custom build.extend function', async () => {
    nuxt = await setupNuxt({
      ...config,
      ...{
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
    })
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('no definitions', async () => {
    nuxt = await setupNuxt({
      ...config,
      ...{
        env: {}
      }
    })
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('no object', async () => {
    nuxt = await setupNuxt({
      ...config,
      ...{
        env: {
          server: 'no object',
          client: 'no object',
          normal: 'Hi'
        }
      }
    })
    expect(logger.error).toHaveBeenNthCalledWith(1, 'Could not assign client env variables. Please provide an object or a function that returns an object!')
    expect(logger.error).toHaveBeenNthCalledWith(2, 'Could not assign server env variables. Please provide an object or a function that returns an object!')
  })
})
