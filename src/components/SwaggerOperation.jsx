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
  const classname = 'hsw-swagger-operation';
  const anchor = `/operations/${operation}/${path}`;
  const method = operation.toUpperCase();
  const {
    summary, description, schemes, consumes, produces, parameters, responses, security,
  } = details;
  return (
    <div className={classname}>
      <Card>
        <CardHeader>
          <CardTitle tag="h3">
            <a name={anchor}>
              {method}{' '}{path}{' '}
              { details.deprecated && <Badge color="danger">deprecated</Badge> }
            </a>
          </CardTitle>
          { summary && <CardSubtitle>{summary}</CardSubtitle> }
        </CardHeader>
        <CardBody>
          { description && <Description format="gfm">{description}</Description> }
          { schemes && <div>schemes <Codes codes={schemes} /></div> }
          { consumes && <div>consumes <Codes codes={consumes} valueIfEmpty="none" /></div> }
          { produces && <div>produces <Codes codes={produces} valueIfEmpty="none" /></div> }
          <SwaggerParameters parameters={parameters} />
          <SwaggerResponses responses={responses} />
          <SwaggerSecurityRequirement security={security} format="operation" />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
