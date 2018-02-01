const React = require('react');
const Description = require('./Description');
const SwaggerSchema = require('./SwaggerSchema');

const SwaggerResponse = ({ status, response }) => {
  const { description, schema } = response;
  return (
    <div>
      <h5>{status}</h5>
      { description && <Description gfm={description} /> }
      { schema && <SwaggerSchema schema={schema} /> }
    </div>
  );
};

module.exports = SwaggerResponse;
