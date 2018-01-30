const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle,
} = require('reactstrap');
const Markdown = require('./Markdown');

const SwaggerOperation = ({ operation, path, details }) => {
  const slug = slugify(`operation-${operation}-${path}`);
  const method = operation.toUpperCase();
  return (
    <div>
      <Card key={slug}>
        <CardBody>
          <CardTitle>{method}{' '}{path}</CardTitle>
          <CardSubtitle>{details.summary}</CardSubtitle>
          <CardText><Markdown>{details.description}</Markdown></CardText>
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
