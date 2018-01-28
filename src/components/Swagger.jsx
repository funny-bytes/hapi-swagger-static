const React = require('react');
const ListOfCode = require('./ListOfCode');
const Html = require('./Html');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');

const Swagger = ({ api }) => (
  <div>
    <h1>{api.info.title}</h1>

    <div>Version: <code>{api.info.version}</code></div>
    <div>Host: <code>{api.host}</code></div>
    <div>Base Path: <code>{api.basePath}</code></div>

    <Html content={api.info.description} />

    <ListOfCode label="The transfer protocols of the API (schemes)" list={api.schemes} />
    <ListOfCode label="The MIME types the APIs can consume" list={api.consumes} />
    <ListOfCode label="The MIME types the APIs can produce" list={api.produces} />

    <h2>Paths</h2>
    <SwaggerPaths paths={api.paths} />

    <h2>Definitions</h2>
    <SwaggerDefinitions definitions={api.definitions} />

  </div>
);

module.exports = Swagger;
