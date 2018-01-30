const Boom = require('boom');
const Hapi = require('hapi');
const SwaggerParser = require('swagger-parser');
const ReactDomServer = require('react-dom/server');
const util = require('util');
const fs = require('fs');
const path = require('path');
const Swagger = require('./components/Swagger');

const readFile = util.promisify(fs.readFile);

const server = new Hapi.Server({
  port: 4000,
});

const parser = new SwaggerParser();

server.route({
  method: 'GET',
  path: '/test',
  handler: async (request, h) => {
    try {
      // const uri = 'https://raw.githubusercontent.com/swagger-api/swagger-codegen/master/modules/swagger-codegen/src/test/resources/2_0/petstore.json';
      const uri = 'http://localhost:3000/swagger.json';
      const api = await parser.parse(uri, {
        resolve: {
          file: false, // don't resolve local file references
          http: {
            timeout: 2000,
            withCredentials: true, // include auth credentials when resolving HTTP references
            headers: {
              Authorization: 'Basic dGVzdDpzZWNyZXQ=', // user `test` -- not supposed to work in production!
            },
          },
        },
      });
      const html = ReactDomServer.renderToStaticMarkup(Swagger({ api }));
      const frame = await readFile(path.join(__dirname, 'frame.html'), 'UTF-8');
      const page = frame
        .replace(/\{\{content\}\}/, html)
        .replace(/\{\{title\}\}/, api.info.title);
      return h.response(page).type('text/html').charset('utf-8');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      return Boom.badImplementation();
    }
  },
});

const provision = async () => {
  try {
    await server.start();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
};

provision();
