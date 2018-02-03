const React = require('react');
const SwaggerPathItem = require('./SwaggerPathItem');
const Description = require('./Description');

const SwaggerPaths = ({ paths }) => {
  const classname = 'hsw-swagger-paths';
  if (!paths) return '';
  const keys = Object.keys(paths);
  if (!keys.length) return '';
  // TODO: support `^x-` fields in paths
  return (
    <div className={classname}>
      <h2>Paths</h2>
      <Description format="text">
        The available paths and operations for the API.
      </Description>
      { keys
          .filter(path => path.match(/^\//))
          .map(path => <SwaggerPathItem path={path} item={paths[path]} />)
      }
    </div>
  );
};

module.exports = SwaggerPaths;
