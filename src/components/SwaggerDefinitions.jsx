const React = require('react');
const SwaggerDefinition = require('./SwaggerDefinition');
const Description = require('./Description');

const SwaggerDefinitions = ({ definitions }) => {
  const classname = 'hsw-swagger-definitions';
  if (!definitions) return '';
  const keys = Object.keys(definitions);
  if (!keys.length) return '';
  return (
    <div className={classname}>
      <h2>Schema definitions</h2>
      <Description format="text">
        The data types produced and consumed by the operations of the API.
      </Description>
      { keys.map((key, i) =>
        <SwaggerDefinition key={`definition-${i}`} name={key} schema={definitions[key]} />)
      }
    </div>
  );
};

module.exports = SwaggerDefinitions;
