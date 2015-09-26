import Application from './lib/Application';
import {adapters, connections} from './api/config/database';

let App = new Application({
  adapters,
  connections
});

App.listen(3000);

// Set the Application in global
global.Application = this;
