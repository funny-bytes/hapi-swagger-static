const Boom = require('boom');
const SwaggerParser = require('swagger-parser');
const ReactDomServer = require('react-dom/server');
const util = require('util');
const fs = require('fs');
const path = require('path');
const Swagger = require('./components/Swagger');
const preprocessor = require('./preprocessor');
const pkg = require('../package.json');

const readFile = util.promisify(fs.readFile);

const register = async (server, {
  path: route = '/documentation.html',
  swaggerEndpoint = '/swagger.json',
  cache = { privacy: 'public', expiresIn: 60 * 60 * 1000 }, // one hour
  auth, // if undefined, inheriting auth settings from server.options.routes.auth
}) => {
  server.route({
    method: 'GET',
    path: route,
    options: auth === undefined ? { cache } : { cache, auth },
    handler: async (request, h) => {
      try {
        const parser = new SwaggerParser();
        const api = await parser.parse(`${server.info.uri}${swaggerEndpoint}`, {
          resolve: {
            file: false, // don't resolve local file references
            http: {
              timeout: 2000,
              withCredentials: true, // include auth credentials when resolving HTTP references
              headers: {
                authorization: request.headers.authorization, // forward
              },
            },
          },
        });
        const html = ReactDomServer.renderToStaticMarkup(Swagger({
          api: await preprocessor(api),
        }));
        const frame = await readFile(path.join(__dirname, 'frame.html'), 'UTF-8');
        const page = frame
          .replace(/\{\{content\}\}/, html)
          .replace(/\{\{title\}\}/, api.info.title);
        return h.response(page).type('text/html').charset('utf-8');
      } catch (error) {
        request.log(['error'], error);
        return Boom.badImplementation();
      }
    },
  });
};

module.exports = { register, pkg };
