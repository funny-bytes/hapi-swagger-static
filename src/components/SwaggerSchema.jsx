const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle,
} = require('reactstrap');

const SwaggerSchema = ({ api, name, schema }) => {
  const slug = slugify(`schema-${name}`);
  return (
    <div>
      <Card key={slug}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardBody>
          {/* todo */}
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerSchema;
