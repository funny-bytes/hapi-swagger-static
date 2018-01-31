const React = require('react');
const SwaggerSchema = require('./SwaggerSchema');

const SwaggerDefinitions = ({ definitions }) => {
  const keys = Object.keys(definitions);
  if (!keys || !keys.length) return '';
  return (
    <div>
      <h2>Schema definitions</h2>
      { keys
          .map(key => <SwaggerSchema name={key} schema={definitions[key]} />)
      }
    </div>
  );
};

module.exports = SwaggerDefinitions;
