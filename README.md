# Separate env module - Tear your variables apart!
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/separate-env/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/separate-env)
[![npm](https://img.shields.io/npm/dt/@nuxtjs/separate-env.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/separate-env)
[![Build Status](https://travis-ci.org/nuxt-community/separate-env-module.svg?branch=master)](https://travis-ci.org/nuxt-community/separate-env-module)
[![codecov](https://codecov.io/gh/nuxt-community/separate-env-module/branch/master/graph/badge.svg)](https://codecov.io/gh/nuxt-community/separate-env-module)
[![Dependencies](https://david-dm.org/nuxt-community/separate-env-module/status.svg?style=flat-square)](https://david-dm.org/nuxt-community/separate-env-module)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

>

[📖 **Release Notes**](./CHANGELOG.md)

## Features

* Separated environment variables for `server` and `client` build
* Thoroughly tested!

## Setup

- Add `@nuxtjs/separate-env` dependency to your project using yarn or npm
- Add to `nuxt.config.js` modules - `modules: ["@nuxtjs/separate-env"]`

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
