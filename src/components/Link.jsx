const React = require('react');

const Link = ({ href, label }) => {
  if (!href) return '';
  let text;
  if (label) {
    text = label;
  } else {
    const match = href.match(/([^#/]+)$/);
    text = match ? match[1] : href;
  }
  return (
    <a color="link" href={href}>{text}</a>
  );
};

module.exports = Link;
