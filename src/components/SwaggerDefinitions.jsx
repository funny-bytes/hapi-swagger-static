const React = require('react');
const SwaggerDefinition = require('./SwaggerDefinition');

const SwaggerDefinitions = ({ definitions }) => {
  const keys = Object.keys(definitions);
  if (!keys || !keys.length) return '';
  return (
    <div>
      <h2>Schema definitions</h2>
      { keys
          .map(key => <SwaggerDefinition name={key} schema={definitions[key]} />)
      }
    </div>
  );
};

module.exports = SwaggerDefinitions;
