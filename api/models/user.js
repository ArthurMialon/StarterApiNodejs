import Waterline from 'Waterline';

/*---------------------------------------------/
| User Model
|
| Export simple Waterline Collection
|----------------------------------------------*/

export default Waterline.Collection.extend({

  identity: 'user',
  connection: 'myMongo',

  attributes: {
    first_name:  {
      type: 'string',
      required: true,
      maxLength: 20
    },
    
    last_name: {
      type: 'string',
      required: true,
      maxLength: 20
    }
  }

});
