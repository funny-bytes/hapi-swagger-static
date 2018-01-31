const React = require('react');
const slugify = require('slugify');
const {
  Card, CardHeader, CardBody, CardTitle, CardSubtitle, Badge,
} = require('reactstrap');
const SwaggerParameters = require('./SwaggerParameters');
const SwaggerResponses = require('./SwaggerResponses');
const Description = require('./Description');
const Codes = require('./Codes');

const SwaggerOperation = ({ operation, path, details }) => {
  const slug = slugify(`operation-${operation}-${path}`);
  const method = operation.toUpperCase();
  const {
    summary, description, schemes, consumes, produces, parameters, responses,
  } = details;
  return (
    <div>
      <Card key={slug}>
        <CardHeader>
          <CardTitle>
            {method}{' '}{path}{' '}
            { details.deprecated && <Badge color="danger">deprecated</Badge> }
          </CardTitle>
          { summary && <CardSubtitle>{summary}</CardSubtitle> }
        </CardHeader>
        <CardBody>
          { description && <Description gfm={description} /> }
          <Codes label="Schemes:" list={schemes} />
          <Codes label="Consumes:" list={consumes} showIfEmpty valueIfEmpty="none" />
          <Codes label="Produces:" list={produces} showIfEmpty valueIfEmpty="none" />
          <SwaggerParameters parameters={parameters} />
          <SwaggerResponses responses={responses} />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
