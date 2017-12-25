const Boom = require('boom');
const bootprint = require('bootprint');
const bootprintSwagger = require('bootprint-openapi');
const fs = require('fs');
const inliner = require('html-inline');
const path = require('path');
const tmp = require('tmp-promise');
const util = require('util');
const pkg = require('../package.json');

const writeFile = util.promisify(fs.writeFile);

const dir = tmp.dirSync({ mode: '0777', prefix: 'tmp_', keep: false });
const fileSwaggerJson = path.join(dir.name, 'swagger.json');
const fileIndexHtml = path.join(dir.name, 'index.html');
const fileIndexHtmlInline = path.join(dir.name, 'index-inline.html');

const createHtml = async (bootprintOptions) => {
  await bootprint
    .load(bootprintSwagger)
    .merge(bootprintOptions)
    .build(fileSwaggerJson, dir.name)
    .generate();
  const inline = inliner({ basedir: dir.name });
  const input = fs.createReadStream(fileIndexHtml, { encoding: 'utf-8' });
  const output = fs.createWriteStream(fileIndexHtmlInline, { encoding: 'utf-8' });
  return new Promise((resolve) => {
    const stream = input.pipe(inline).pipe(output);
    stream.on('finish', async () => resolve());
  });
};

const register = async (server, {
  path: route = '/documentation.html',
  bootprint: bootprintOptions = {},
  cache = { privacy: 'public', expiresIn: 60 * 60 * 1000 }, // one hour
}) => {
  // Provide endpoint serving html from file
  server.route({
    method: 'GET',
    path: route,
    options: {
      cache,
    },
    handler: async (request, h) => {
      try {
        const stream = fs.createReadStream(fileIndexHtmlInline, { encoding: 'utf-8' });
        return h.response(stream).type('text/html').charset('utf-8');
      } catch (error) {
        return Boom.badImplementation();
      }
    },
  });
  // Pre-compile static html page at server startup
  try {
    const { payload: swaggerJson } = await server.inject({
      url: '/swagger.json',
    });
    await writeFile(fileSwaggerJson, swaggerJson);
    await createHtml(bootprintOptions);
    server.log(['info'], 'static swagger documentation successfully pre-compiled');
  } catch (error) {
    server.log(['error'], error);
  }
};

module.exports = { register, pkg };
