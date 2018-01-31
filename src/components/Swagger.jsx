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
      <Markdown content={api.info.description} />
      <div>Version: <code>{api.info.version}</code></div>
      <div>Host: <code>{api.host}</code></div>
      <div>Base Path: <code>{api.basePath}</code></div>
      <Codes label="Schemes:" list={api.schemes} />
      <Codes label="MIME types consumed:" list={api.consumes} />
      <Codes label="MIME types produced:" list={api.produces} />
      <SwaggerPaths api={api} paths={api.paths} />
      <SwaggerDefinitions api={api} definitions={api.definitions} />
    </div>
  );
};

module.exports = Swagger;
