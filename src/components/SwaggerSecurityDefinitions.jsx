const React = require('react');
const SwaggerSecurityScheme = require('./SwaggerSecurityScheme');

const SwaggerSecurityDefinitions = ({ securityDefinitions }) => {
  if (!securityDefinitions) return '';
  return (
    <div>
      <h2>Security Definitions</h2>
      <p>
        The security schemes available to be used in the specification.
        This does not enforce the security schemes on the operations and only serves to
        provide the relevant details for each scheme.
      </p>
      { Object
          .entries(securityDefinitions)
          .map(([name, securityScheme]) => {
            securityScheme.name = name; // eslint-disable-line no-param-reassign
            return <SwaggerSecurityScheme securityScheme={securityScheme} />;
          })
      }
    </div>
  );
};

module.exports = SwaggerSecurityDefinitions;
