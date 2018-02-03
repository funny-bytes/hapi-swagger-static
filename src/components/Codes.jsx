const React = require('react');
const slugify = require('slugify');

const Codes = ({
  codes, labelIfEmpty,
}) => {
  if (!codes) return '';
  if (!codes.length) {
    return labelIfEmpty ? <span>{labelIfEmpty}</span> : '';
  }
  return (
    <span>
      { codes.map((str, i) => <span>{i ? ', ' : ''}<code key={slugify(str)}>{str}</code></span>)}
    </span>
  );
};

module.exports = Codes;
