const React = require('react');
const {
  Card, CardHeader, CardBody, CardTitle,
} = require('reactstrap');
const SwaggerSchema = require('./SwaggerSchema');

const SwaggerDefinition = ({ name, schema }) => {
  const classname = 'hsw-swagger-definition';
  const anchor = `/definitions/${name}`;
  return (
    <div className={classname}>
      <Card>
        <CardHeader>
          <CardTitle><a name={anchor}>{name}</a></CardTitle>
        </CardHeader>
        <CardBody>
          <SwaggerSchema schema={schema} />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerDefinition;
