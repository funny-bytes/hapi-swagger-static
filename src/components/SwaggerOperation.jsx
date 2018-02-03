const React = require('react');
const {
  Card, CardHeader, CardBody, CardTitle, CardSubtitle, Badge,
} = require('reactstrap');
const SwaggerParameters = require('./SwaggerParameters');
const SwaggerResponses = require('./SwaggerResponses');
const SwaggerSecurityRequirement = require('./SwaggerSecurityRequirement');
const Description = require('./Description');
const Codes = require('./Codes');

const SwaggerOperation = ({ operation, path, details }) => {
  const anchor = `/operations/${operation}/${path}`;
  const method = operation.toUpperCase();
  const {
    summary, description, schemes, consumes, produces, parameters, responses, security,
  } = details;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <a name={anchor}>
              {method}{' '}{path}{' '}
              { details.deprecated && <Badge color="danger">deprecated</Badge> }
            </a>
          </CardTitle>
          { summary && <CardSubtitle>{summary}</CardSubtitle> }
        </CardHeader>
        <CardBody>
          { description && <Description format="gfm">{description}</Description> }
          { schemes && <div>Schemes <Codes codes={schemes} /></div> }
          { consumes && <div>Consumes <Codes codes={consumes} valueIfEmpty="none" /></div> }
          { produces && <div>Produces <Codes codes={produces} valueIfEmpty="none" /></div> }
          <SwaggerParameters parameters={parameters} />
          <SwaggerResponses responses={responses} />
          <SwaggerSecurityRequirement security={security} format="operation" />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
