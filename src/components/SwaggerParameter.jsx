const React = require('react');
const { Badge } = require('reactstrap');
const Description = require('./Description');
const SwaggerDataType = require('./SwaggerDataType');

const SwaggerParameter = ({ parameter }) => {
  const {
    name, in: location, description, required,
  } = parameter;
  return (
    <div>
      <h5>
        {name}{' '}
        { location && `(${location})` }{' '}
        { required && <Badge color="secondary">required</Badge> }
      </h5>
      { description && <Description gfm={description} /> }
      <SwaggerDataType {...parameter} />
      { parameter.items &&
        <div>{'item '}<SwaggerDataType {...parameter.items} /></div>
      }
    </div>
  );
};

module.exports = SwaggerParameter;
