const React = require('react');
const { Badge } = require('reactstrap');
const Markdown = require('./Markdown');

const SwaggerParameter = ({ api, parameter }) => {
  const {
    name, in: location, type: datatype, description, required,
  } = parameter;
  return (
    <div>
      <h5>
        {name}{' '}({location}){' '}
        { required && <Badge color="secondary">required</Badge> }
      </h5>
      { (datatype && datatype !== 'body') &&
        <div>
          <code>{datatype}</code>
        </div>
      }
      { description &&
        <Markdown content={description} />
      }
    </div>
  );
};

module.exports = SwaggerParameter;
