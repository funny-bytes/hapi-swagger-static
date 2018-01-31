const React = require('react');
const SwaggerResponse = require('./SwaggerResponse');

const SwaggerResponses = ({ responses }) => {
  if (!responses) return '';
  const statusCodes = Object.keys(responses);
  if (!statusCodes.length) return '';
  return (
    <div>
      <h4>Responses</h4>
      { statusCodes
          .map(status => <SwaggerResponse status={status} response={responses[status]} />)
      }
    </div>
  );
};

module.exports = SwaggerResponses;
