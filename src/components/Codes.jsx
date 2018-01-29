const React = require('react');
const slugify = require('slugify');

const Codes = ({ label, list }) => {
  if (!list || !list.length) return '';
  return (
    <div>
      {label}{' '}
      {list.map(str => <code key={slugify(str)}>{str}</code>)}
    </div>
  );
};

module.exports = Codes;