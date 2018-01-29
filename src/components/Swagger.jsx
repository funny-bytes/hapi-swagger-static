const React = require('react');
const Codes = require('./Codes');
const Html = require('./Html');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');

const Swagger = ({ api }) => (
  <div>
    <h1>{api.info.title}</h1>

    <div>Version: <code>{api.info.version}</code></div>
    <div>Host: <code>{api.host}</code></div>
    <div>Base Path: <code>{api.basePath}</code></div>
    <Codes label="Schemes:" list={api.schemes} />

    <Html content={api.info.description} />

    <Codes label="The MIME types the APIs can consume:" list={api.consumes} />
    <Codes label="The MIME types the APIs can produce:" list={api.produces} />

    <SwaggerPaths paths={api.paths} />

    <SwaggerDefinitions definitions={api.definitions} />

  </div>
);

module.exports = Swagger;
