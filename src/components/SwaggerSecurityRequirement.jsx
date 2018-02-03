const React = require('react');
const Codes = require('./Codes');

const SwaggerSecurityRequirement = ({ security, format = 'api' }) => {
  if (!security) return '';
  return (
    <div>
      { format === 'api' &&
        <div>
          <h2>Security</h2>
          <p>
            The security schemes as applied for the API as a whole.
            If there are multiple schemes declared, they can be used alternatively
            (that is, there is a logical OR between the security requirements).
            Individual operations can override this definition.
          </p>
        </div>
      }
      { format === 'operation' &&
        <div>
          <h4>Security</h4>
          <p>
            The security schemes as applied for this operation.
            If there are multiple schemes declared, they can be used alternatively
            (that is, there is a logical OR between the security requirements).
          </p>
        </div>
      }
      { security.map(scheme => Object.entries(scheme).map(([name, scopes = []]) => (
        <div>
          <code>{name}</code>
          { (scopes && scopes.length > 0) &&
            <span> with required scopes <Codes codes={scopes} /></span>
          }
        </div>
      )))
      }
    </div>
  );
};

module.exports = SwaggerSecurityRequirement;
