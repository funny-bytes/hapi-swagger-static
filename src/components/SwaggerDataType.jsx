const React = require('react');
const decamelize = require('decamelize');
const Link = require('./Link');

const SwaggerDataType = (type) => {
  const extended = Object.keys(type).filter(key => key.match(/^x-/)); // e.g., `x-format`
  const props = [
    'type', 'format', 'allowEmptyValue', 'collectionFormat', 'default',
    'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength',
    'pattern', 'maxItems', 'minItems', 'uniqueItems', 'enum', 'multipleOf', '$ref',
    ...extended,
  ];
  return (
    props
      .filter(prop => type[prop] !== undefined)
      .map((prop, i) => {
        // $ref
        if (prop === '$ref') {
          return <span>{i ? ', ' : ''}type <Link href={type[prop]} /></span>;
        }
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
        } else if (prop.match(/^x-/)) {
          value = <code>{JSON.stringify(type[prop])}</code>;
        } else {
          value = <code>{type[prop]}</code>;
        }
        // label
        let label;
        if (prop === 'enum') {
          label = 'allowed values';
        } else if (prop === 'default') {
          label = 'default value';
        } else if (prop.match(/^x-/)) {
          label = `extended ${decamelize(prop.substr(2), ' ')}`;
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
