const React = require('react');
const md2html = require('github-flavored-markdown');
const renderHtml = require('react-render-html');

const Markdown = ({ content }) => (
  content ? <div>{renderHtml(md2html.parse(content))}</div> : ''
);

module.exports = Markdown;
