const React = require('react');
const Markdown = require('./Markdown');

const SwaggerParameters = ({ api, parameters }) => {
  if (!parameters || !parameters.length) return '';
  const selection = parameters
    .filter(param => param.in === 'body');
  if (!selection.length) return '';
  const { name, schema, description } = selection[0];
  return (
    <div>
      <hr />
      <h4>Body</h4>
      { description &&
        <Markdown content={description} />
      }
      {/* TODO */}
    </div>
  );
};

module.exports = SwaggerParameters;
