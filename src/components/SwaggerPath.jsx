const React = require('react');
const slugify = require('slugify');

const SwaggerPath = ({ title, path }) => (
  <div>
    <h3 key={slugify(title)}><code>{title}</code></h3>
    {/* todo */}
  </div>
);

module.exports = SwaggerPath;
