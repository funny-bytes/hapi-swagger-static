const React = require('react');
const slugify = require('slugify');

const SwaggerOperation = ({ operation, path, details }) => {
  const slug = slugify(`${operation}${path}`);
  const method = operation.toUpperCase();
  return (
    <div>
      <h3 key={slug}>{method}{' '}{path}</h3>
      {/* todo */}
    </div>
  );
};

module.exports = SwaggerOperation;
