import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

/*---------------------------------------------/
| Express configuration
| See documentation at:
| http://expressjs.com/4x/api.html
|
| Should always return the app
|----------------------------------------------*/

export default function init(app) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(methodOverride());

  return app;
}
