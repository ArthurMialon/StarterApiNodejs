export default class Options {

  /**
   * Constructor
   */
  constructor() {
    this.types = {
      BOOLEAN : "boolean",
      ARRAY   : "array",
      FUNCTION: "function",
      OBJECT  : "object",
      STRING  : "string"
    };
  }

  /**
   * Init option
   * @param {mixed} value of option parameter
   * @return {function} middleware function
   */
  init(value) {
    let accept = this.checkValue(value);
    if (accept) {
      if (!this.getMiddleware(value)) {
        console.log("Your middleware for this type doesn't exist");
        console.log("Option name: ", this.constructor.name);
        return console.log("Value : ", value);
      }
      return this.getMiddleware(value);
    }
  }

  /**
   * Get the middleware function
   * @param {mixed} value of option parameter
   * @return {function} middleware function
   */
  getMiddleware(value) {
    if (value.length && typeof value === "object") {
      return this.forArray(value);
    }else {
      let type = typeof value;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      return this["for"+type](value).bind(this);
    }
  }

  /**
   * Check the value of the parameter
   * @param {mixed} value of option parameter
   * @return {boolean}
   */
  checkValue(value) {
    if (value.length && typeof value == "object") {
      if (this.accept.indexOf("array") === -1) {
        return false;
      }
    }else {
      if (this.accept.indexOf(typeof value) === -1) {
        return false;
      }
    }

    return true;
  }



}
