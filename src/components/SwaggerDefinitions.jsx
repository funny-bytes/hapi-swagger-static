const React = require('react');
const SwaggerDefinition = require('./SwaggerDefinition');

const SwaggerDefinitions = ({ definitions }) => {
  const keys = Object.keys(definitions);
  if (!keys || !keys.length) return '';
  return (
    keys.map(key => <SwaggerDefinition title={key} definition={definitions[key]} />)
  );
};

module.exports = SwaggerDefinitions;
