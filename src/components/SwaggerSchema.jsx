const React = require('react');
const Description = require('./Description');
const SwaggerDataType = require('./SwaggerDataType');
const SwaggerParameter = require('./SwaggerParameter');

const SwaggerSchema = ({ schema }) => {
  const {
    description, properties, items, required,
  } = schema;
  // TODO: support `$ref` references in schema
  // TODO: support `additionalProperties` in schema
  // TODO: support `allOf` in schema
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
  } else if (items) { // && type === 'array'
    schema.type = 'array'; // eslint-disable-line no-param-reassign
    return (
      <div>
        { description && <Description gfm={description} /> }
        <SwaggerDataType {...schema} />
        <div>{'item '}<SwaggerDataType {...items} /></div>
      </div>
    );
  }
  return (
    <div>
      { description && <Description gfm={description} /> }
      <SwaggerDataType {...schema} />
    </div>
  );
};

module.exports = SwaggerSchema;
