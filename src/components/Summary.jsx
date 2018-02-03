const React = require('react');

const Summary = ({ api }) => {
  const classname = 'hsw-summary';
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
    <div className={classname}>
      <h2>Summary</h2>
      { endpoints
          .map(({
            path, method, href, summary,
          }, i) => (
            <dl key={`summary-${i}`}>
              <dt><a href={href}>{method}{' '}{path}</a></dt>
              { summary && <dd>{summary}</dd> }
            </dl>
          ))
      }
    </div>
  );
};

module.exports = Summary;
