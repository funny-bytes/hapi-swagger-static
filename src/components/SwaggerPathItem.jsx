const React = require('react');
const SwaggerOperation = require('./SwaggerOperation');

const SwaggerPathItem = ({ path, item }) => {
  const operations = Object.keys(item);
  return (
    <div>
      { operations
          .filter(op => op.match(/^(get)|(put)|(post)|(delete)|(options)|(head)|(patch)|$/))
          .map(op => <SwaggerOperation path={path} operation={op} item={item[operations]} />)
      }
    </div>
  );
};

module.exports = SwaggerPathItem;
