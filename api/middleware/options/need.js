import Option from '../../../lib/Option';

export default class Need extends Option {
  /**
  * Constructor
  */
  constructor() {
    super();
    this.accept = [
      this.types.BOOLEAN
    ];
  }

  /**
   *  Call when the parameter is an object
   *  @param  {object} value [the parameter in the route definition]
   *  @return {function}     [the middleware]
   */
  forObject(value) {
    return function(req, res, next) {
      next();
    };
  }

  /**
   *  Call when the parameter is a boolean
   *  @param  {boolean} value [the parameter in the route definition]
   *  @return {function}     [the middleware]
   */
  forBoolean(parameter) {
    // Bind with this --> Need Options
    return function(req, res, next) {
      // do something with parameters
      console.log(parameter);
      next();
    };
  }

}
