export default class Options {

  constructor() {
    this.types = {
      BOOLEAN: "boolean",
      ARRAY: "array",
      FUNCTION: "function",
      OBJECT: "object"
    };
  }

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

  getMiddleware(value) {
    if (value.length) {
      return this.forArray(value);
    }else {
      let type = typeof value;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      return this["for"+type](value).bind(this);
    }
  }

  checkValue(value) {
    if (value.length) {
      if (this.accept.indexOf("array") == -1) {
        return false;
      }
    }else {
      if (this.accept.indexOf(typeof value) == -1) {
        return false;
      }
    }

    return true;
  }



}
