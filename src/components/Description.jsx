const React = require('react');
const md2html = require('github-flavored-markdown');
const renderHtml = require('react-render-html');

const Description = ({ format = 'gfm', children = '' }) => {
  const classname = 'hsw-description';
  if (format === 'gfm') {
    return (
      <div className={classname}>
        {renderHtml(md2html.parse(children))}
      </div>
    );
  }
  if (format === 'html') {
    return (
      <div className={classname}>
        {renderHtml(<p>{children}</p>)}
      </div>
    );
  }
  if (format === 'text') {
    return (
      <div className={classname}>
        <p>{children}</p>
      </div>
    );
  }
  return '';
};

module.exports = Description;
