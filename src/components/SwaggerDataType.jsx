const React = require('react');
const decamelize = require('decamelize');
const Link = require('./Link');

const SwaggerDataType = (type) => {
  const classname = 'hsw-swagger-data-type';
  const extended = Object.keys(type).filter(key => key.match(/^x-/)); // e.g., `x-format`
  const props = [
    'type', 'format', 'allowEmptyValue', 'collectionFormat', 'default',
    'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength',
    'pattern', 'maxItems', 'minItems', 'uniqueItems', 'enum', 'multipleOf', '$ref',
    ...extended,
  ];
  const { header = '' } = type; // a contextual header string
  return (
    <div className={classname}>
      {header}{' '}
      { props
          .filter(prop => type[prop] !== undefined)
          .map((prop, i) => {
            // $ref
            if (prop === '$ref') {
              return (
                <span key={`datatype-${i}`}>{i ? ', ' : ''}<Link href={type[prop]} /></span>
              );
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
              value = <span>[{type.enum.map((val, j) => <span key={`enum-${j}`}>{j ? ', ' : ''}<code>{val}</code></span>)}]</span>;
            } else if (prop.match(/^x-/)) {
              value = <code>{JSON.stringify(type[prop])}</code>;
            } else {
              value = <code>{type[prop]}</code>;
            }
            // label
            let label;
            if (prop === 'type') {
              label = ''; // show contextual header instead
            } else if (prop === 'enum') {
              label = 'allowed values';
            } else if (prop === 'default') {
              label = 'default value';
            } else if (prop.match(/^x-/)) {
              label = `extended ${decamelize(prop.substr(2), ' ')}`;
            } else {
              label = decamelize(prop, ' ');
            }
            return (
              <span key={`datatype-${i}`}>{i ? ', ' : ''}{label}{' '}{value}</span>
            );
          })
      }
    </div>
  );
};

module.exports = SwaggerDataType;
