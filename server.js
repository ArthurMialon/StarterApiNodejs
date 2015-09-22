import Application from './lib/Application';
import {adapters, connections} from './api/config/database';

let App = new Application({
  adapters,
  connections
});

App.listen(3000);
