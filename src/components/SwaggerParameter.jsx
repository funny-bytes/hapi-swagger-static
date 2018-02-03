const React = require('react');
const { Badge } = require('reactstrap');
const Description = require('./Description');
const SwaggerDataType = require('./SwaggerDataType');

const SwaggerParameter = ({ parameter }) => {
  const classname = 'hsw-swagger-parameter';
  const {
    name, in: location, description, required,
  } = parameter;
  return (
    <div className={classname}>
      <h5>
        {name}{' '}
        { location && ` (${location}) ` }
        { required && <Badge color="secondary">required</Badge> }
      </h5>
      { description && <Description format="gfm">{description}</Description> }
      <SwaggerDataType {...parameter} />
      { parameter.items &&
        <div>{'item '}<SwaggerDataType {...parameter.items} /></div>
      }
    </div>
  );
};

module.exports = SwaggerParameter;
