const React = require('react');
const md2html = require('github-flavored-markdown');
const renderHtml = require('react-render-html');

const Description = ({ format = 'gfm', children = '' }) => {
  if (format === 'gfm') {
    return (
      <div className="description">
        {renderHtml(md2html.parse(children))}
      </div>
    );
  }
  if (format === 'html') {
    return (
      <div className="description">
        {renderHtml(<p>{children}</p>)}
      </div>
    );
  }
  if (format === 'text') {
    return (
      <div className="description">
        <p>{children}</p>
      </div>
    );
  }
  return '';
};

module.exports = Description;
