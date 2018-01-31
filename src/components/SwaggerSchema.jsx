const React = require('react');
const slugify = require('slugify');
const Description = require('./Description');
const SwaggerDataType = require('./SwaggerDataType');
const SwaggerParameter = require('./SwaggerParameter');

const SwaggerSchema = ({ name, schema }) => {
  const slug = slugify(`schema-${name}`);
  const {
    type, description, properties, items, required,
  } = schema;
  if (type === 'object') {
    return (
      <div>
        { description && <Description gfm={description} /> }
        <SwaggerDataType {...schema} />
        <h4>Properties</h4>
        <div>{
          Object
            .keys(properties)
            .map((prop) => {
              const property = properties[prop];
              property.name = prop;
              property.required = (required || []).includes(prop);
              return <SwaggerParameter parameter={property} />;
            })
          }
        </div>
      </div>
    );
  } else if (type === 'array') {
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
