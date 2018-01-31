const React = require('react');
const SwaggerOperation = require('./SwaggerOperation');

const SwaggerPathItem = ({ api, path, item }) => {
  const operations = Object.keys(item);
  return (
    <div>
      { operations
          .filter(op => op.match(/^(get)|(put)|(post)|(delete)|(options)|(head)|(patch)|$/))
          .map(op => <SwaggerOperation api={api} path={path} operation={op} details={item[op]} />)
      }
    </div>
  );
};

module.exports = SwaggerPathItem;
