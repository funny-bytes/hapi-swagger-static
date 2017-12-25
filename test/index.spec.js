const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const HapiSwaggerStatic = require('../src/index');

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

async function setup({ pluginOptions = {} }) {
  const server = new Hapi.Server({
    port: 9001,
  });
  const route = {
    method: 'GET',
    path: '/test4711',
    handler: () => 'ok',
    options: {
      tags: ['api'],
    },
  };
  await server.route(route);
  await server.register({ plugin: Inert });
  await server.register({ plugin: Vision });
  await server.register({
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'API Documentation 4711',
      },
    },
  });
  await server.register({ plugin: HapiSwaggerStatic, options: pluginOptions });
  await server.start();
  return server;
}

describe('hapi-swagger-static with default options', async () => {
  let server;

  beforeEach(async () => {
    server = await setup({});
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should provide route `documentation.html` which returns HTTP 200 with html content', () =>
    server
      .inject({
        url: '/documentation.html',
      })
      .should.be.fulfilled.then((response) => {
        const { statusCode, headers, payload } = response;
        expect(statusCode).to.be.equal(200);
        expect(headers).to.have.property('content-type');
        expect(headers['content-type']).to.be.equal('text/html; charset=utf-8');
        expect(headers['cache-control']).to.be.equal('max-age=3600, must-revalidate, public');
        expect(payload).to.contain('<html>');
        expect(payload).to.contain('<!DOCTYPE html>');
        expect(payload).to.contain('<title>API Documentation 4711</title>');
        expect(payload).to.contain('/test4711');
      }));
});

describe('hapi-swagger-static with `path` option', async () => {
  let server;

  beforeEach(async () => {
    server = await setup({ pluginOptions: { path: '/printable.html' } });
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should provide route `printable.html`', () =>
    server
      .inject({
        url: '/printable.html',
      })
      .should.be.fulfilled.then((response) => {
        const { statusCode, headers, payload } = response;
        expect(statusCode).to.be.equal(200);
        expect(headers).to.have.property('content-type');
        expect(headers['content-type']).to.be.equal('text/html; charset=utf-8');
        expect(headers['cache-control']).to.be.equal('max-age=3600, must-revalidate, public');
        expect(payload).to.contain('<html>');
        expect(payload).to.contain('<!DOCTYPE html>');
        expect(payload).to.contain('<title>API Documentation 4711</title>');
        expect(payload).to.contain('/test4711');
      }));
});
