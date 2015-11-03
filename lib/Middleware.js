export default class Middleware {

  /**
  * Constructor
  */
  constructor(key, value) {
    key = key.toLowerCase();

    // In case of simple middleware
    if (key === "middleware") {
      return this.simple(value);
    }

    if (OPTIONS[key]) {
      return {
        key: key,
        value: OPTIONS[key].init(value)
      };
    }
  }

  /**
  * Get middleware from middleware options
  * @param {array} middlewares [an array of middleware location in api/middleware]
  * @return {array} middleware function
  */
  simple(middlewares) {
    return middlewares
    .map( middle => middle.split('.') )
    .map( middle => {
      if (middle.length === 2) return require("../api/middleware/" + middle[0])[middle[1]];
      return require("../api/middleware/index")[middle[0]];
    });
  }
}
