const React = require('react');
const Description = require('./Description');
const Codes = require('./Codes');

const SwaggerSecurityScheme = ({ securityScheme }) => {
  const classname = 'hsw-swagger-security-scheme';
  const {
    type, description, name, in: location, flow, authorizationUrl, tokenUrl, scopes,
  } = securityScheme;
  return (
    <div className={classname}>
      <h4>
        {name}{ location && ` (${location})` }
      </h4>
      { description && <Description format="gfm">{description}</Description> }
      { type && <div>Type <code>{type}</code></div> }
      { flow && <div>Flow <code>{flow}</code></div> }
      { authorizationUrl && <div>Authorization URL <code>{authorizationUrl}</code></div> }
      { tokenUrl && <div>Token URL <code>{tokenUrl}</code></div> }
      { scopes && <div>Scopes <Codes codes={Object.keys(scopes)} labelIfEmpty="none" /></div> }
    </div>
  );
};

module.exports = SwaggerSecurityScheme;
