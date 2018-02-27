# hapi-swagger-static

Plugin for Hapi v17 providing a static html documentation page.
It's a small companion plugin for `hapi-swagger` or `hapi-swaggered`
to create a static page from the `/swagger.json` endpoint.
The static page is provided as route `/documentation.html` (can be renamed).
It supports most of Swagger 2.0 / Open API 2.0.

[![build status](https://img.shields.io/travis/frankthelen/hapi-swagger-static.svg)](http://travis-ci.org/frankthelen/hapi-swagger-static)
[![Coverage Status](https://coveralls.io/repos/github/frankthelen/hapi-swagger-static/badge.svg?branch=master)](https://coveralls.io/github/frankthelen/hapi-swagger-static?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/frankthelen/hapi-swagger-static.svg)](https://gemnasium.com/github.com/frankthelen/hapi-swagger-static)
[![Greenkeeper badge](https://badges.greenkeeper.io/frankthelen/hapi-swagger-static.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/f71c0020a54eefa732ef/maintainability)](https://codeclimate.com/github/frankthelen/hapi-swagger-static/maintainability)
[![node](https://img.shields.io/node/v/hapi-swagger-static.svg)]()
[![code style](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![License Status](http://img.shields.io/npm/l/hapi-swagger-static.svg)]()

## Install

```bash
npm install hapi-swagger-static
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
| `path`      | `/documentation.html` | The endpoint providing the static documentation page. |
| `swaggerEndpoint` | `/swagger.json` | The endpoint to read the Swagger API specification from. |
| `cache`     | `{ privacy: 'public', expiresIn: 60 * 60 * 1000 } // one hour` | Hapi's `route.options.cache` to be assigned to the static documentation endpoint. Please refer to the [Hapi docs](https://hapijs.com/api#-routeoptionscache) for more information. |
| `auth`      |  - | Hapi's `route.options.auth` to be assigned to the static documentation endpoint. Please refer to the [Hapi docs](https://hapijs.com/api#-routeoptionsauth) for more information. By default, this option is not set, i.e., inheriting auth settings from Hapi's `server.options.routes.auth`. |
| `headers` | `{}` | The request's `authorization` header is automatically forwarded to the `/swagger.json` endpoint. If you need any additional headers, add them through the `headers` option. |
| `template` | - | This plugin prefers `vision` to render the api into a page. `template` is the template filename and path, relative to the templates path configured via the server views manager. The api data is provided as view context. Assuming Handlebars or Mustache as your template engine, e.g., you can use `{{api.info.title}}` in the template to get hold of the api title. Use `{{{api.html}}}` (with three curly brackets here!) in the template for rendering the api's html content. |
| `viewOptions` | `{}` | The options passed to the view via `h.view()`. If your default layout does not provide the Bootstrap 4 CSS resources (Bootstrap's JS is not needed), you should provide a special layout for your template. See the example below. |
| `o2hOptions` | `{}` | The options passed to `openapi2html`. Please refer to [openapi2html](https://github.com/frankthelen/openapi2html#options) for more information. |

## View Example

This example assumes Handlebars or Mustache as template engine.
It sets the following plugin options:
```js
{ template: 'api', // referring to the view file `api.html` below
  viewOptions: {
    layout: 'api-layout' // referring to the layout file `api-layout.html` below
  }
}
```

View example, e.g., `api.html` to be placed into your view location:
```html
{{{api.html}}}
```

Layout example, e.g., `api-layout.html` to be placed into your layout location:
```html
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
    <link href='/public/api.css' rel='stylesheet' type='text/css' />
    <title>{{api.info.title}}</title>
  </head>
  <body>
    <div class="container">
      {{{content}}}
      <footer>Your company; for internal use only</footer>
    </div>
  </body>
</html>
```

Style example, e.g., `api.css` to be placed into `/public`, containing some minor adjustments to Bootstrap 4:
```css
.h2, h2 {
  margin-top: 1rem;
}
.h4, h4 {
  margin-top: .5rem;
}
.card {
  margin-bottom: 1rem;
}
.o2h-description p {
  color: grey;
  margin-bottom: .5rem;
}
.card .card-body .h4, .card .card-body h4 {
  border-top: 1px solid #eee;
  margin-top: 1rem;
  padding-top: 1rem;
}
.card .card-body .h5, .card .card-body h5 {
  margin-top: 1rem;
}
.card .card-body .o2h-description p {
  margin-bottom: 0;
}
.card .card-body .o2h-example pre {
  background-color: #eee;
  font-size: small;
}
.o2h-parameter h5 .badge {
  font-size: small;
}
```
