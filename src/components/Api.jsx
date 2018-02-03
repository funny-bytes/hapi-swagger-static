const React = require('react');
const Codes = require('./Codes');
const Description = require('./Description');
const Summary = require('./Summary');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');
const SwaggerSecurityDefinitions = require('./SwaggerSecurityDefinitions');
const SwaggerSecurityRequirement = require('./SwaggerSecurityRequirement');

const Api = ({ api }) => {
  const classname = 'hsw-api';
  if (api.swagger !== '2.0') {
    throw new Error(`unsupported swagger version: ${api.swagger}`);
  }
  const {
    info, host, basePath, schemes, consumes, produces, paths, definitions,
    securityDefinitions, security,
  } = api;
  const { title, description, version } = info;
  return (
    <div className={classname}>
      <h1>{title}</h1>
      <Description format="gfm">{description}</Description>
      <div>Version <code>{version}</code></div>
      <div>Host <code>{host}</code></div>
      <div>Base path <code>{basePath}</code></div>
      { schemes && <div>Schemes <Codes codes={schemes} /></div> }
      { consumes && <div>Consumes <Codes codes={consumes} /></div> }
      { produces && <div>Produces <Codes codes={produces} /></div> }
      <Summary api={api} />
      <SwaggerSecurityDefinitions securityDefinitions={securityDefinitions} />
      <SwaggerSecurityRequirement security={security} />
      <SwaggerPaths paths={paths} />
      <SwaggerDefinitions definitions={definitions} />
    </div>
  );
};

module.exports = Api;