# hapi-swagger-static

Plugin for Hapi v17 providing a static html documentation page.
It's a small companion plugin for `hapi-swagger`
utilizing `bootprint` and `bootprint-openapi`
to create a static page from the `/swagger.json`.
The static page is provided as route `/documentation.html` (can be renamed).

[![build status](https://img.shields.io/travis/frankthelen/hapi-swagger-static.svg)](http://travis-ci.org/frankthelen/hapi-swagger-static)
[![Coverage Status](https://coveralls.io/repos/github/frankthelen/hapi-swagger-static/badge.svg?branch=master)](https://coveralls.io/github/frankthelen/hapi-swagger-static?branch=master)
[![dependencies Status](https://david-dm.org/frankthelen/hapi-swagger-static/status.svg)](https://david-dm.org/frankthelen/hapi-swagger-static)
[![Greenkeeper badge](https://badges.greenkeeper.io/frankthelen/hapi-swagger-static.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/f71c0020a54eefa732ef/maintainability)](https://codeclimate.com/github/frankthelen/hapi-swagger-static/maintainability)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffrankthelen%2Fhapi-swagger-static.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffrankthelen%2Fhapi-swagger-static?ref=badge_shield)
[![node](https://img.shields.io/node/v/hapi-swagger-static.svg)]()
[![License Status](http://img.shields.io/npm/l/hapi-swagger-static.svg)]()

## Install

```bash
npm install --save hapi-swagger-static
```

## Usage

Register the plugin with Hapi server like this:

```js
const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const HapiSwaggerStatic = require('hapi-swagger-static');
const Inert = require('inert');
const Vision = require('vision');

const server = new Hapi.Server({
  port: 3000,
});

const provision = async () => {
  await server.register({ plugin: Inert });
  await server.register({ plugin: Vision });
  // first, add your api routes to hapi
  await server.register({ // second, register `hapi-swagger` plugin
    plugin: HapiSwagger,
    options: { ... },
  });
  await server.register({ // last, register this plugin
    plugin: HapiSwaggerStatic,
    options: { ... },
  });
  await server.start();
};

provision();
```

## Options

The plugin provides the following options:

| Option      | Default     | Description |
|-------------|-------------|-------------|
| `path`      | `/documentation.html` | The route providing the static documentation page. |
| `bootprint` | `{}` | Bootprint options as passed to `bootprint.merge()`. Please refer to the [Bootprint configuration options](https://github.com/bootprint/bootprint/blob/master/doc/config.md) for more information. |
| `cache`     | `{ privacy: 'public', expiresIn: 60 * 60 * 1000 } // one hour` | Hapi's `route.options.cache`. Please refer to the [Hapi docs](https://hapijs.com/api#-routeoptionscache) for more information. |
| `auth`      |  - | Hapi's `route.options.auth`. Please refer to the [Hapi docs](https://hapijs.com/api#-routeoptionsauth) for more information. By default, this option is not set, i.e., inheriting auth settings from Hapi's `server.options.routes.auth`. |
