const fs = require('fs');
const path = require('path');
const util = require('util');
const Hapi = require('@hapi/hapi');
const HapiSwaggerStatic = require('..'); // eslint-disable-line import/order

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

describe('hapi-swagger-static for petstore API', () => {
  let server;

  beforeEach(async () => {
    server = await setup({});
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should provide route `documentation.html` for petstore.json', async () => {
    const { statusCode, headers, payload } = await server.inject({
      url: '/documentation.html',
    });
    expect(statusCode).toEqual(200);
    expect(headers).toHaveProperty('content-type');
    expect(headers['content-type']).toEqual('text/html; charset=utf-8');
    expect(headers).toHaveProperty('cache-control');
    expect(headers['cache-control']).toContain('max-age=3600');
    expect(headers['cache-control']).toContain('public');
    expect(payload).toContain('<html>');
    expect(payload).toContain('<title>Swagger Petstore</title>');
    expect(payload).toContain('<h1>Swagger Petstore</h1>');
  });
});
