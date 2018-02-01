const React = require('react');
const Description = require('./Description');
const SwaggerDataType = require('./SwaggerDataType');
const SwaggerParameter = require('./SwaggerParameter');

const SwaggerSchema = ({ schema }) => {
  const {
    description, properties, additionalProperties, allOf, items, required,
  } = schema;
  if (items) { // && type === 'array'
    schema.type = 'array'; // eslint-disable-line no-param-reassign
    return (
      <div>
        { description && <Description gfm={description} /> }
        <SwaggerDataType {...schema} />
        <div>{'item '}<SwaggerDataType {...items} /></div>
      </div>
    );
  }
  if (properties) { // && type === 'object'
    schema.type = 'object'; // eslint-disable-line no-param-reassign
    const props = Object.keys(properties);
    return (
      <div>
        { description && <Description gfm={description} /> }
        <SwaggerDataType {...schema} />
        <h4>Properties</h4>
        <div>{
          props.map((prop) => {
            const property = properties[prop];
            property.name = prop;
            property.required = (required || []).includes(prop);
            return <SwaggerParameter parameter={property} />;
          })
        }
        </div>
      </div>
    );
  }
  if (additionalProperties) { // && type === 'object'
    schema.type = 'object'; // eslint-disable-line no-param-reassign
    return ''; // TODO: support `additionalProperties` in schema
  }
  if (allOf) {
    return ''; // TODO: support `allOf` in schema
  }
  return (
    <div>
      { description && <Description gfm={description} /> }
      <SwaggerDataType {...schema} />
    </div>
  );
};

module.exports = SwaggerSchema;
