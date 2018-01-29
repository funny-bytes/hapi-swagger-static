const React = require('react');
const SwaggerSchema = require('./SwaggerSchema');

const SwaggerDefinitions = ({ definitions }) => {
  const keys = Object.keys(definitions);
  if (!keys || !keys.length) return '';
  return (
    keys.map(key => <SwaggerSchema title={key} schema={definitions[key]} />)
  );
};

module.exports = SwaggerDefinitions;
