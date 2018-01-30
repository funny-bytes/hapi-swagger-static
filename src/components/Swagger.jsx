const React = require('react');
const Codes = require('./Codes');
const Markdown = require('./Markdown');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');

const Swagger = ({ api }) => {
  if (api.swagger !== '2.0') {
    throw new Error(`unsupported swagger version: ${api.swagger}`);
  }
  return (
    <div>
      <h1>{api.info.title}</h1>
      <div>Version: <code>{api.info.version}</code></div>
      <div>Host: <code>{api.host}</code></div>
      <div>Base Path: <code>{api.basePath}</code></div>
      <Codes label="Schemes:" list={api.schemes} />
      <Markdown content={api.info.description} />
      <Codes label="The MIME types the APIs can consume:" list={api.consumes} />
      <Codes label="The MIME types the APIs can produce:" list={api.produces} />
      <SwaggerPaths paths={api.paths} />
      <SwaggerDefinitions definitions={api.definitions} />
    </div>
  );
};

module.exports = Swagger;
