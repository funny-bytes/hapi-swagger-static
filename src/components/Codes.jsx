const React = require('react');
const slugify = require('slugify');

const Codes = ({
  label, list, showIfEmpty, valueIfEmpty,
}) => {
  if (!list) return '';
  if (!list.length && !showIfEmpty) return '';
  return (
    <div>
      {label}{' '}
      { list.map((str, i) => <span>{i ? ', ' : ''}<code key={slugify(str)}>{str}</code></span>)}
      { (!list.length && valueIfEmpty) && { valueIfEmpty } }
    </div>
  );
};

module.exports = Codes;
