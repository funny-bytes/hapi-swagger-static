const fs = require('fs');
const semver = require('semver');
const HapiSwaggerStatic = require('..'); // eslint-disable-line import/order

const nodeVersion = process.version;
const node12 = semver.satisfies(nodeVersion, '>=12.x.x');
const Hapi = node12 ? require('hapi19') : require('hapi18');
const HapiSwagger = node12 ? require('hapiSwagger12') : require('hapiSwagger11');
const Inert = node12 ? require('inert6') : require('inert5');
const Vision = node12 ? require('vision6') : require('vision5');

// jest.mock('fs');

// eslint-disable-next-line no-console
console.log(`Testing Node ${nodeVersion}, Hapi ${node12 ? '19' : '18'}`);

async function setup({ pluginOptions = {} }) {
  const server = new Hapi.Server({
    port: 9005,
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
      jsonPath: pluginOptions.swaggerEndpoint || '/swagger.json',
      info: {
        title: 'API Documentation 4711',
      },
    },
  });
  await server.register({ plugin: HapiSwaggerStatic, options: pluginOptions });
  await server.start();
  return server;
}

describe('hapi-swagger-static with default options', () => {
  let server;

  beforeEach(async () => {
    server = await setup({});
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should provide route `documentation.html` which returns HTTP 200 with html content', async () => {
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
    expect(payload).toContain('<title>API Documentation 4711</title>');
    expect(payload).toContain('<h1>API Documentation 4711</h1>');
    expect(payload).toContain('/test4711');
  });
});

describe('hapi-swagger-static with `path` option', () => {
  let server;

  beforeEach(async () => {
    server = await setup({ pluginOptions: { path: '/printable.html' } });
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should provide route `printable.html`', async () => {
    const { statusCode, headers, payload } = await server.inject({
      url: '/printable.html',
    });
    expect(statusCode).toEqual(200);
    expect(headers).toHaveProperty('content-type');
    expect(headers['content-type']).toEqual('text/html; charset=utf-8');
    expect(headers).toHaveProperty('cache-control');
    expect(headers['cache-control']).toContain('max-age=3600');
    expect(headers['cache-control']).toContain('public');
    expect(payload).toContain('<html>');
    expect(payload).toContain('<title>API Documentation 4711</title>');
    expect(payload).toContain('<h1>API Documentation 4711</h1>');
    expect(payload).toContain('/test4711');
  });
});

describe('hapi-swagger-static with `cache` option equals `false`', () => {
  let server;

  beforeEach(async () => {
    server = await setup({ pluginOptions: { cache: false } });
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should not set `cache-control` header', async () => {
    const { statusCode, headers } = await server.inject({
      url: '/documentation.html',
    });

    expect(statusCode).toEqual(200);
    expect(headers).not.toHaveProperty('cache-control');
  });
});

describe('hapi-swagger-static with specific `cache` option', () => {
  let server;

  beforeEach(async () => {
    server = await setup({
      pluginOptions: { cache: { privacy: 'public', expiresIn: 24 * 60 * 60 * 1000 } },
    });
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should set `cache-control` header specifically', async () => {
    const { statusCode, headers } = await server
      .inject({
        url: '/documentation.html',
      });
    expect(statusCode).toEqual(200);
    expect(headers).toHaveProperty('cache-control');
    expect(headers['cache-control']).toContain('max-age=86400');
    expect(headers['cache-control']).toContain('public');
  });
});

describe('hapi-swagger-static with specific `swaggerEndpoint` option', () => {
  let server;

  beforeEach(async () => {
    server = await setup({
      pluginOptions: { swaggerEndpoint: '/swaggerBLA.json' },
    });
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should create /documentation.html correctly', async () => {
    const { statusCode, payload } = await server
      .inject({
        url: '/documentation.html',
      });
    expect(statusCode).toEqual(200);
    expect(payload).toContain('<html>');
    expect(payload).toContain('<title>API Documentation 4711</title>');
    expect(payload).toContain('<h1>API Documentation 4711</h1>');
    expect(payload).toContain('/test4711');
  });
});

describe('hapi-swagger-static with error while plugin registration', () => {
  beforeEach(async () => {
    jest.spyOn(fs, 'createReadStream').mockImplementation(() => {
      throw new Error('Error');
    });
    jest.spyOn(fs, 'createWriteStream').mockImplementation(() => {
      throw new Error('Error');
    });
  });

  afterEach(async () => {
    fs.createReadStream.mockReset();
    fs.createWriteStream.mockReset();
  });

  it('should not fail', async () => {
    await expect(() => setup({})).not.toThrow();
  });
});
