const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardBody, CardTitle,
} = require('reactstrap');
const SwaggerSchema = require('./SwaggerSchema');

const SwaggerDefinition = ({ name, schema }) => {
  const slug = slugify(`definition-${name}`);
  return (
    <div>
      <Card key={slug}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardBody>
          <SwaggerSchema name={name} schema={schema} />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerDefinition;
