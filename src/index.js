const Promise = require('bluebird');
const SwaggerParser = require('swagger-parser');
const openapi2html = require('openapi2html');
const util = require('util');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const readFile = util.promisify(fs.readFile);

const register = async (server, {
  path: route = '/documentation.html',
  swaggerEndpoint = '/swagger.json',
  cache = { privacy: 'public', expiresIn: 60 * 60 * 1000 }, // one hour
  auth, // if undefined, inheriting auth settings from server.options.routes.auth
  headers: additionalHeaders = {},
  frame: framePath = path.join(__dirname, 'frame.html'),
}) => {
  server.route({
    method: 'GET',
    path: route,
    options: auth === undefined ? { cache } : { cache, auth },
    handler: async (request, h) => Promise.try(async () => {
      const parser = new SwaggerParser();
      const api = await parser.parse(`${server.info.uri}${swaggerEndpoint}`, {
        resolve: {
          file: false, // don't resolve local file references
          http: {
            timeout: 2000,
            withCredentials: true, // include auth credentials when resolving HTTP references
            headers: {
              authorization: request.headers.authorization, // forward
              ...additionalHeaders,
            },
          },
        },
      });
      const html = openapi2html(api);
      const frame = await readFile(framePath, 'UTF-8');
      const page = frame
        .replace(/\{\{content\}\}/, html)
        .replace(/\{\{title\}\}/, api.info.title);
      return h.response(page).type('text/html').charset('utf-8');
    }),
  });
};

module.exports = { register, pkg };
