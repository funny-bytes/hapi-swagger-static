const React = require('react');

const Summary = ({ api }) => {
  const endpoints = [];
  Object.entries(api.paths).forEach(([path, operations]) => {
    Object.entries(operations).forEach(([operation, { summary }]) => {
      endpoints.push({
        path,
        method: operation.toUpperCase(),
        summary,
        href: `#/operations/${operation}/${path}`,
      });
    });
  });
  return (
    <div>
      <h2>Summary</h2>
      { endpoints
          .map(({ path, method, href }) => <div><a href={href}>{method}{' '}{path}</a></div>)
      }
    </div>
  );
};

module.exports = Summary;
