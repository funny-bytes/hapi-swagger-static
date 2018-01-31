const React = require('react');
const Codes = require('./Codes');
const Description = require('./Description');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');

const Swagger = ({ api }) => {
  if (api.swagger !== '2.0') {
    throw new Error(`unsupported swagger version: ${api.swagger}`);
  }
  const {
    info, host, basePath, schemes, consumes, produces, paths, definitions,
  } = api;
  const { title, description, version } = info;
  return (
    <div>
      <h1>{title}</h1>
      <Description gfm={description} />
      <div>Version: <code>{version}</code></div>
      <div>Host: <code>{host}</code></div>
      <div>Base Path: <code>{basePath}</code></div>
      <Codes label="Schemes:" list={schemes} />
      <Codes label="Consumes:" list={consumes} />
      <Codes label="Produces:" list={produces} />
      <SwaggerPaths paths={paths} />
      <SwaggerDefinitions definitions={definitions} />
    </div>
  );
};

module.exports = Swagger;
