const React = require('react');
const SwaggerParameter = require('./SwaggerParameter');
const SwaggerSchema = require('./SwaggerSchema');
const Description = require('./Description');

const SwaggerParameters = ({ parameters }) => {
  if (!parameters || !parameters.length) return '';
  const pars = parameters
    .filter(par => !par.$ref) // TODO support "$ref" references in parameters
    .filter(par => par.in !== 'body');
  const body = parameters
    .filter(par => par.in === 'body')[0];
  return (
    <div>
      { pars.length > 0 &&
        <div>
          <h4>Request Parameters</h4>
          { pars.map(par => <SwaggerParameter parameter={par} />) }
        </div>
      }
      { body &&
        <div>
          <h4>Request Body</h4>
          { body.description && <Description gfm={body.description} /> }
          { body.schema && <SwaggerSchema schema={body.schema} /> }
        </div>
      }
    </div>
  );
};

module.exports = SwaggerParameters;
