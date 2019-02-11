# Separate env module - Tear your variables apart!

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]

> Separated environment variables for `server` and `client` build

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/separate-env` dependency with `yarn` or `npm` into your project
2. Add `@nuxtjs/separate-env` to `modules` section of `nuxt.config.js`:
3. Configure it:

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/separate-env',
 ],
 env: [
   // Your environment variables here
 ]
}
```

## Configuration

To define environment variables only available on `server`/`client` side,
use the `env` key of your `nuxt.config.js` and nest the variables
in a `server` or `client` object:

```js
{
  env: {
    server: {
      ONLY_SERVER: 'yup',
      DIFFERENT_ON_BOTH: 'server'
    },
    client: {
      ONLY_CLIENT: 'okay',
      DIFFERENT_ON_BOTH: 'client'
    },
    normalEnvVariableThatWillBeAvailableEverywhere: 'Hi'
  }
}
```

That's it! You are good to go.

## Caveats

**IMPORTANT:** Be aware that `server-side` includes every first render of your application.
Your secret tokens won't be included anywhere **except you use them **

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Alexander Lichter

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/separate-env.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/separate-env
[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/separate-env/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/separate-env
[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/separate-env-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/separate-env-module
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/separate-env-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/separate-env-module
[david-dm-src]: https://david-dm.org/nuxt-community/separate-env-module/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/nuxt-community/separate-env-module
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
