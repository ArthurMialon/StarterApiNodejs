import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

export default function init(app) {

  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(methodOverride());
  app.use(morgan('dev'));

  return app;
}
