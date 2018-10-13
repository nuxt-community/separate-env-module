const consola = require('consola')
const { Nuxt, Builder } = require('nuxt-edge')

const timeout = 60 * 1000

describe('ssr', () => {
  let log

  beforeEach(() => {
    log = jest.fn()
    consola.clear().add({ log })
  })

  test('server variables only accessible on server-bundle', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/ssr'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
    await nuxt.close()
  }, timeout)

  test('correctly assign env variables from function', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/ssr-with-function'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
    await nuxt.close()
  }, timeout)

  test('honor custom build.extend function', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/ssr-with-extend'))
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
    await nuxt.close()
  }, timeout)

  test('error when no object is provided', async () => {
    nuxt = await setupNuxt(require('./fixture/configs/no-object'))
    const expectedMessage = 'Could not assign server env variables. Please provide an object or a function that returns an object!'
    const consolaMessages = log.mock.calls.map(c => c[0].message)
    expect(consolaMessages).toContain(expectedMessage)
  }, timeout)
})

describe('csr', () => {
  test('only client-side variables are available', async () => {
    const nuxt = await setupNuxt(require('./fixture/configs/csr'))
    const { html } = await renderSpaRoute(nuxt, '/')
    expect(html).toMatchSnapshot()
    await nuxt.close()
  }, timeout)
})

const setupNuxt = async (config) => {
  const nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  await nuxt.listen(3000)

  return nuxt
}

const renderSpaRoute = async (nuxt, _url) => {
  const url = route => `http://localhost:3000${route}`
  const window = await nuxt.renderAndGetWindow(url(_url))
  const head = window.document.head.innerHTML
  const html = window.document.body.innerHTML
  return { window, head, html }
}
