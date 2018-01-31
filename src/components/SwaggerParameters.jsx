const React = require('react');
const SwaggerParameter = require('./SwaggerParameter');

const SwaggerParameters = ({ api, parameters }) => {
  if (!parameters || !parameters.length) return '';
  // TODO: support `$ref` fields
  return (
    <div>
      <hr />
      <h4>Parameters</h4>
      { parameters
        .filter(param => !param.$ref) // TODO "$ref" reference objects
        .filter(param => param.is !== 'body') // TODO operation body
        .map(param => <SwaggerParameter api={api} parameter={param} />)
      }
    </div>
  );
};

module.exports = SwaggerParameters;
