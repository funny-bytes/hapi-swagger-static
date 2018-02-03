const React = require('react');
const slugify = require('slugify');

const Codes = ({ codes, labelIfEmpty }) => {
  const classname = 'hsw-codes';
  if (!codes) return '';
  if (!codes.length) {
    return labelIfEmpty ? <span className={classname}>{labelIfEmpty}</span> : '';
  }
  return (
    <span className={classname}>
      { codes.map((str, i) => <span>{i ? ', ' : ''}<code key={slugify(str)}>{str}</code></span>)}
    </span>
  );
};

module.exports = Codes;
