const React = require('react');
const SwaggerDefinition = require('./SwaggerDefinition');

const SwaggerDefinitions = ({ definitions }) => {
  if (!definitions) return '';
  const keys = Object.keys(definitions);
  if (!keys.length) return '';
  return (
    <div>
      <h2>Schema definitions</h2>
      <p>
        The data types produced and consumed by the operations of the API.
      </p>
      { keys
          .map(key => <SwaggerDefinition name={key} schema={definitions[key]} />)
      }
    </div>
  );
};

module.exports = SwaggerDefinitions;
