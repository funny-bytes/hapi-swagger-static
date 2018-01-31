const React = require('react');
const md2html = require('github-flavored-markdown');
const renderHtml = require('react-render-html');

const Description = ({ gfm, content = md2html.parse(gfm) }) => (
  content ? <div className="description">{renderHtml(content)}</div> : ''
);

module.exports = Description;
