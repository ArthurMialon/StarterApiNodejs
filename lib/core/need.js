var is = require('is_js');

module.exports = {

  policies  : [],
  acceptTest: ['=', '>', "<", "date", "length"],
  testNumber: ["=", ">", "<"],
  testString: ["length"],
  testDate  : ["date"],

  /**
  * Check what the user should be
  * @param Object req
  * @param Object route
  * @return boolean
  */
  check: function(req, route) {

    // Restriction configuration
    this.need = route.need;
    // User calling the API
    this.user = req.user;

    for(var n in this.need) {
      // If user hasn't the properties
      if(!this.user[n]) return false;
      // In case of boolean
      if(is.boolean(this.need[n]))
        (!this.isBoolean(n, this.need[n])) ? this.policies.push(1) : true;
      // In case of integer
      else if (is.number(this.need[n]))
        (!this.isNumber(n, this.need[n])) ? this.policies.push(1) : true;
      // In case of String
      else if (is.string(this.need[n]))
        (!this.isString(n, this.need[n])) ? this.policies.push(1) : true;
    }
    return (this.policies.length > 0) ? false : true;
  },

  /**
  * Check Boolean
  * @param String name
  * @param String value
  * @param Boolean
  */
  isBoolean: function(name, value) {
    return (this.user[name] && this.user[name] != value) ? false : true;
  },

  /**
  * Check integer
  * @param String name
  * @param String value
  * @param Boolean
  */
  isNumber: function(name, value) {
    return (this.user[name] && this.user[name] != value) ? false : true;
  },

  /**
  * Check String
  * @param String name
  * @param String value
  * @param Boolean
  */
  isString: function(name, value) {
    // Cut the string
    var parse = value.split(' ');

    // Complex String
    if(this.acceptTest.indexOf(parse[0]) != -1) {

      // In case of number
      if(this.testNumber.indexOf(parse[0]) != -1)
        return this.validateNumber(name, parse[1], parse[0]);

      // In case of a date
      else if(this.testDate.indexOf(parse[0]) != -1) {
        // => DATE
        // Exemple -> 'date = 10/30/2016'
        // Exemple -> 'date = today'
        // Exemple -> 'date = yesteday'
        // Exemple -> 'date = tomorrow'
        // Exemple -> 'date > 10/30/2016'
        // Exemple -> 'date < 10/30/2016'
        return true;
      }

      // In case of a string
      else if(this.testString.indexOf(parse[0]) != -1)
        return this.valideString(name, parse[2], parse[1]);
    }
    // Simple String
    else
      return (this.user[name] && this.user[name] == value) ? true : false

    return true;
  },

  /**
  * Validate a Number
  * @param String name
  * @param String value
  * @param String operator
  */
  validateNumber: function(name, value, operator) {
    return ((operator == ">"  && (this.user[name] && this.user[name] < value) )
    || (operator == "=" && (this.user[name] && this.user[name] != value) )
    || (operator == "<" && (this.user[name] && this.user[name] > value) ))
    ? false : true;
  },

  /**
  * Validate a String
  * @param String name
  * @param String value
  * @param String operator
  */
  valideString: function(name, value, operator) {
    return ((operator == ">"  && (this.user[name] && this.user[name].length < value))
     || (operator == "=" && (this.user[name] && this.user[name].length != value))
     || (operator == "<" && (this.user[name] && this.user[name].length > value)))
     ? false : true;
  }

}
