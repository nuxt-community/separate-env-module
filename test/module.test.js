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
    const nuxt = await setupNuxt(require('./fixture/configs/no-object'))
    expect(log).toHaveBeenCalledTimes(1)
    await nuxt.close()
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
