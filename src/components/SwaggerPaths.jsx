const React = require('react');
const SwaggerPathItem = require('./SwaggerPathItem');

const SwaggerPaths = ({ paths }) => {
  const keys = Object.keys(paths);
  if (!keys || !keys.length) return '';
  // TODO: support `^x-` fields
  return (
    <div>
      <h2>Paths</h2>
      { keys
          .filter(path => path.match(/^\//))
          .map(path => <SwaggerPathItem path={path} item={paths[path]} />)
      }
    </div>
  );
};

module.exports = SwaggerPaths;
