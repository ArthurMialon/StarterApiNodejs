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

    username: {
      type: 'string',
      required: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    first_name:  {
      type: 'string',
      required: true,
      maxLength: 20
    },

    last_name: {
      type: 'string',
      required: true,
      maxLength: 20
    },

    fullName() {
      return `${this.first_name} ${this.last_name}`;
    }
  }

});
