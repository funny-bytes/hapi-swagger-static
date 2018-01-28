const React = require('react');
const renderHtml = require('react-render-html');

const Html = ({ content }) => (
  content ? <div>{renderHtml(content)}</div> : ''
);

module.exports = Html;
