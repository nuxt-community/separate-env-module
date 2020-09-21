# Separate env module - Tear your variables apart!

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Separated environment variables for `server` and `client` build

[📖 **Release Notes**](./CHANGELOG.md)

:warning: With Nuxt v2.13 you might want to  use the [new runtime config](https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config) instead of this.

## Setup

1. Add `@nuxtjs/separate-env` dependency to your project

```bash
yarn add @nuxtjs/separate-env # or npm install @nuxtjs/separate-env
```

2. Add `@nuxtjs/separate-env` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@nuxtjs/separate-env'
  ],
  env: {
    // Your environment variables here (see Configuration section below)
  }
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

**IMPORTANT:** Be aware that `server-side` means on **every** first render of your application.
Your secret tokens won't be included anywhere **except where you use them**

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) - Nuxt Community

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/separate-env/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/separate-env

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/separate-env.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/separate-env

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/separate-env-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/separate-env-module

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/separate-env-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/separate-env-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/separate-env.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/separate-env
