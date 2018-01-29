const React = require('react');
const slugify = require('slugify');

const SwaggerSchema = ({ title, schema }) => (
  <div>
    <h3 key={slugify(title)}>{title}</h3>
    {/* todo */}
  </div>
);

module.exports = SwaggerSchema;
