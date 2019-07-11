const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');
const util = require('util');
const HapiSwaggerStatic = require('../src/index');
require('./setupTests');

const readFile = util.promisify(fs.readFile);

async function setup({ pluginOptions = {} }) {
  const server = new Hapi.Server({
    port: 9005,
  });
  const route = {
    method: 'GET',
    path: '/swagger.json',
    handler: async () => readFile(path.join(__dirname, 'petstore.json'), 'UTF-8'),
    options: {
      tags: ['api'],
    },
  };
  await server.route(route);
  await server.register({ plugin: HapiSwaggerStatic, options: pluginOptions });
  await server.start();
  return server;
}

describe('hapi-swagger-static for petstore API', async () => {
  let server;

  beforeEach(async () => {
    server = await setup({});
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should provide route `documentation.html` for petstore.json', () => server
    .inject({
      url: '/documentation.html',
    })
    .should.be.fulfilled.then((response) => {
      const { statusCode, headers, payload } = response;
      expect(statusCode).to.be.equal(200);
      expect(headers).to.have.property('content-type');
      expect(headers['content-type']).to.be.equal('text/html; charset=utf-8');
      expect(headers).to.have.property('cache-control');
      expect(headers['cache-control']).to.contain('max-age=3600');
      expect(headers['cache-control']).to.contain('public');
      expect(payload).to.contain('<html>');
      expect(payload).to.contain('<title>Swagger Petstore</title>');
      expect(payload).to.contain('<h1>Swagger Petstore</h1>');
    }));
});
