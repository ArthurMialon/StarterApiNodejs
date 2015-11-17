import Application from './lib/Application';
import {adapters, connections} from './api/config/database';
import configuration from './api/config/configuration';

let App = new Application({
  adapters,
  connections
}, () => {

});

/* Listen server */
App.listen(configuration.port);

/* Set the Application in global */
App.setGlobals();
