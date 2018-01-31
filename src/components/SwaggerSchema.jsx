const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle,
} = require('reactstrap');

const SwaggerSchema = ({ api, title, schema }) => {
  const slug = slugify(`model-${title}`);
  return (
    <div>
      <Card key={slug}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardBody>
          {/* todo */}
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerSchema;
