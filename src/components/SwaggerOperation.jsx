const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardBody, CardTitle, CardSubtitle, Badge,
} = require('reactstrap');
const SwaggerParameters = require('./SwaggerParameters');
const SwaggerResponses = require('./SwaggerResponses');
const Markdown = require('./Markdown');
const Codes = require('./Codes');

const SwaggerOperation = ({ operation, path, details }) => {
  const slug = slugify(`operation-${operation}-${path}`);
  const method = operation.toUpperCase();
  return (
    <div>
      <Card key={slug}>
        <CardHeader>
          <CardTitle>
            {method}{' '}{path}{' '}
            { details.deprecated && <Badge color="danger">deprecated</Badge> }
          </CardTitle>
          { details.summary &&
            <CardSubtitle>{details.summary}</CardSubtitle>
          }
        </CardHeader>
        <CardBody>
          { details.description &&
            <Markdown content={details.description} />
          }
          <Codes
            label="Schemes:"
            list={details.schemes}
          />
          <Codes
            label="Consumes:"
            list={details.consumes}
            showIfEmpty
            valueIfEmpty="none"
          />
          <Codes
            label="Produces:"
            list={details.produces}
            showIfEmpty
            valueIfEmpty="none"
          />
          <SwaggerParameters parameters={details.parameters} />
          <SwaggerResponses reponses={details.responses} />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
