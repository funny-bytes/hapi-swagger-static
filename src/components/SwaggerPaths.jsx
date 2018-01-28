const React = require('react');
const SwaggerPath = require('./SwaggerPath');

const SwaggerPaths = ({ paths }) => {
  const keys = Object.keys(paths);
  if (!keys || !keys.length) return '';
  return (
    keys.map(key => <SwaggerPath title={key} path={paths[key]} />)
  );
};

module.exports = SwaggerPaths;
