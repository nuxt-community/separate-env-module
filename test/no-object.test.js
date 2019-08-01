jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const logger = require('../lib/logger')

logger.mockTypes(() => jest.fn())

describe('no object', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(require('./fixture/no-object/nuxt.config'))
    await nuxt.ready()
    await new Builder(nuxt).build()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('should display logger error', () => {
    expect(logger.error).toHaveBeenNthCalledWith(1, 'Could not assign client env variables. Please provide an object or a function that returns an object!')
    expect(logger.error).toHaveBeenNthCalledWith(2, 'Could not assign server env variables. Please provide an object or a function that returns an object!')
  })
})
