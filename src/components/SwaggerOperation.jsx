const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardBody, CardTitle, CardSubtitle, Badge,
} = require('reactstrap');
const SwaggerParameters = require('./SwaggerParameters');
const SwaggerResponses = require('./SwaggerResponses');
const SwaggerBody = require('./SwaggerBody');
const Markdown = require('./Markdown');
const Codes = require('./Codes');

const SwaggerOperation = ({
  api, operation, path, details,
}) => {
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
            list={details.consumes || api.consumes}
            showIfEmpty
            valueIfEmpty="none"
          />
          <Codes
            label="Produces:"
            list={details.produces || api.produces}
            showIfEmpty
            valueIfEmpty="none"
          />
          <SwaggerParameters api={api} parameters={details.parameters} />
          <SwaggerBody api={api} parameters={details.parameters} />
          <SwaggerResponses api={api} reponses={details.responses} />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
