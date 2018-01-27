const Boom = require('boom');
const Hapi = require('hapi');
const SwaggerParser = require('swagger-parser');
const ReactDomServer = require('react-dom/server');
const SwaggerComponent = require('./components/SwaggerComponent');

const server = new Hapi.Server({
  port: 4000,
});

const parser = new SwaggerParser();

server.route({
  method: 'GET',
  path: '/test',
  handler: async (request, h) => {
    try {
      const api = await parser.parse('http://localhost:3000/swagger.json', {
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
      const component = SwaggerComponent({ api });
      const html = ReactDomServer.renderToStaticMarkup(component);
      return h.response(html).type('text/html').charset('utf-8');
    } catch (error) {
      request.log(['error'], error);
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
