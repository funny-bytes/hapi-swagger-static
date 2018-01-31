const React = require('react');
const decamelize = require('decamelize');

const SwaggerDataType = (type) => {
  const props = [
    'type', 'format', 'allowEmptyValue', 'collectionFormat', 'default',
    'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength',
    'pattern', 'maxItems', 'minItems', 'uniqueItems', 'enum', 'multipleOf',
  ];
  return (
    props
      .filter(prop => type[prop] !== undefined)
      .map((prop, i) => {
        // value
        let value;
        if (type[prop] === true) {
          value = <code>true</code>;
        } else if (type[prop] === false) {
          value = <code>false</code>;
        } else if (type[prop] === null) {
          value = <code>null</code>;
        } else if (prop === 'enum') {
          value = <span>[{type.enum.map((val, j) => <span>{j ? ', ' : ''}<code>{val}</code></span>)}]</span>;
        } else {
          value = <code>{type[prop]}</code>;
        }
        // label
        let label;
        if (prop === 'enum') {
          label = 'allowed values';
        } else if (prop === 'default') {
          label = 'default value';
        } else {
          label = decamelize(prop, ' ');
        }
        return (
          <span>{i ? ', ' : ''}{label}{' '}{value}</span>
        );
      })
  );
};

module.exports = SwaggerDataType;
