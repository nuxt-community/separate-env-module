const consola = require('consola')
const getPort = require('get-port')
const { Nuxt, Builder } = require('nuxt-edge')

jest.setTimeout(30 * 1000)

let nuxt, port

describe('ssr', () => {
  let log

  beforeEach(() => {
    log = jest.fn()
    consola.clear().add({ log })
  })

  test('server variables only accessible on server-bundle', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/ssr'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('correctly assign env variables from function', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/ssr-with-function'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('honor custom build.extend function', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/ssr-with-extend'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })

  test('error when no object is provided', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/no-object'))
    const expectedMessage = 'Could not assign server env variables. Please provide an object or a function that returns an object!'
    const consolaMessages = log.mock.calls.map(c => c[0].message)
    expect(consolaMessages).toContain(expectedMessage)
  })

  afterEach(async () => {
    if (nuxt) {
      await nuxt.close()
    }
  })
})

describe('csr', () => {
  test('only client-side variables are available', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/csr'))
    const { html } = await renderSpaRoute(nuxt, '/')
    expect(html).toMatchSnapshot()
  })

  afterEach(async () => {
    if (nuxt) {
      await nuxt.close()
    }
  })
})

const setupNuxt = async (config) => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  port = await getPort()
  await nuxt.listen(port)

  return nuxt
}

const url = route => `http://localhost:${port}${route}`

const renderSpaRoute = async (nuxt, _url) => {
  const window = await nuxt.renderAndGetWindow(url(_url))
  const head = window.document.head.innerHTML
  const html = window.document.body.innerHTML
  return { window, head, html }
}
