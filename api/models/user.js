import Waterline from 'Waterline';
import bcrypt from 'bcrypt-nodejs';

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
      required: true
    },

    password: {
      type: 'string',
      required: true
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

    /**
    * Get fullname
    */
    fullName() {
      return `${this.first_name} ${this.last_name}`;
    },

    /**
    * Compare password and validate
    */
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  },

  /**
  * Before create the user
  */
  beforeCreate(user, next) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    next();
  },



});
