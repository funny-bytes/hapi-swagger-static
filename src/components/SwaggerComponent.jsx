const React = require('react');

/* eslint-disable react/prop-types */

const SwaggerComponent = ({ api }) => (
  <div>
    <h1>{api.info.title}</h1>
    <p>
      Base URL: {api.basePath},
      Version: {api.info.version}
    </p>
    <p>{api.info.description}</p>
  </div>
);

module.exports = SwaggerComponent;
