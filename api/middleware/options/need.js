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
  forObject(parameter) {
    return function(req, res, next) {
      console.log(parameter);
      next();
    };
  }

  /**
   *  Call when the parameter is a boolean
   *  @param  {boolean} value [the parameter in the route definition]
   *  @return {function}     [the middleware]
   */
  forBoolean(parameter) {
    return function(req, res, next) {
      console.log(parameter);
      next();
    };
  }

}
