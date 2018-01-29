const React = require('react');
const SwaggerPathItem = require('./SwaggerPathItem');

const SwaggerPaths = ({ paths }) => {
  const keys = Object.keys(paths);
  if (!keys || !keys.length) return '';
  // TODO: support `^x-` fields
  return (
    keys
      .filter(path => path.match(/^\//))
      .map(path => <SwaggerPathItem path={path} item={paths[path]} />)
  );
};

module.exports = SwaggerPaths;
