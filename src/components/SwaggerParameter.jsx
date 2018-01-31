const React = require('react');
const { Badge } = require('reactstrap');
const Markdown = require('./Markdown');
const SwaggerDataType = require('./SwaggerDataType');

const SwaggerParameter = ({ parameter }) => {
  const {
    name, in: location, description, required,
  } = parameter;
  return (
    <div>
      <h5>
        {name}{' '}({location}){' '}
        { required && <Badge color="secondary">required</Badge> }
      </h5>
      <div>
        <SwaggerDataType {...parameter} />
      </div>
      { parameter.items &&
        <div>
          {'items '}<SwaggerDataType {...parameter.items} />
        </div>
      }
      { description &&
        <Markdown content={description} />
      }
    </div>
  );
};

module.exports = SwaggerParameter;
