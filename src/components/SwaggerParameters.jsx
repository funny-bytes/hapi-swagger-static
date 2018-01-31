const React = require('react');
const SwaggerParameter = require('./SwaggerParameter');

const SwaggerParameters = ({ api, parameters }) => {
  if (!parameters || !parameters.length) return '';
  const selection = parameters
    .filter(param => !param.$ref) // TODO "$ref" reference objects
    .filter(param => param.in !== 'body'); // TODO operation body
  if (!selection.length) return '';
  return (
    <div>
      <hr />
      <h4>Parameters</h4>
      { selection
        .map(param => <SwaggerParameter api={api} parameter={param} />)
      }
    </div>
  );
};

module.exports = SwaggerParameters;
