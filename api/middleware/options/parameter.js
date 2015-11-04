import Option from '../../../lib/Option';

export default class Parameter extends Option {

  /**
  * Constructor
  */
  constructor() {
    super();

    /*
      Accept parameter
    */
    this.accept = [
      this.types.BOOLEAN,
      this.types.ARRAY
    ];

    /*
      Missing parameter
    */
    this.missing = [];
  }

  /**
   * Configuration with boolean
   */
  forBoolean(parameter) {
    // Assume that parameter is 'false'
    return function(req, res, next) {
      next();
    };
  }

  /**
   * Configuration with Array
   */
  forArray(parameter) {
    this.parameter = parameter;

    return this.verify.bind(this);
  }

  /**
   * Middleware to check parameters
   * @param {object} request
   * @param {object} response
   * @param {function} next
   */
  verify(req, res, next) {
    this.parameter.forEach(parameter => {
      if (!this.checkParam(parameter, req.body)) {
        this.missing.push(parameter);
      }
    });

    if (this.missing.length > 0) {
      return res.status(400).send(this.formatMissing());
    }

    next();
  }

  /**
   * Format a response when parameter(s) is/are missing
   * @return {object} format object
   */
  formatMissing() {
    return {
      status: 400,
      message: 'Missing ' + this.missing.length + (this.missing.length > 1 ? " parameters" : " parameter"),
      parameters: this.missing.map((parameter) => {
        return {
          name: parameter
        };
      })
    };
  }

  /**
   * Check if a parameter exist
   * @param {string} parameter name
   * @param {object} request body object
   * @return {boolean}
   */
  checkParam(param, body) {
    return !!body[param];
  }



}
