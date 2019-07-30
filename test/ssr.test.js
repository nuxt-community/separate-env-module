jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const { waitFor } = require('@nuxt/utils-edge')
const getPort = require('get-port')

describe('ssr', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(require('./fixture/ssr/nuxt.config'))
    await nuxt.ready()
    await new Builder(nuxt).build()
    await waitFor(2000)
    await nuxt.listen(await getPort())
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const { html } = await nuxt.renderRoute('/')
    expect(html).toMatchSnapshot()
  })
})
