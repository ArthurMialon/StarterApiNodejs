import Controller from "../../lib/Controller";

export default class Base extends Controller {

  /**
  * Constructor
  */
  constructor() {
    super();
  }

  /**
  * Index route
  * @param {object} request
  * @param {object} response
  */
  index(req, res) {
    res.send("Hello World ! Welcome on your API");
  }

  /**
  * Error 404
  * @param {object} request
  * @param {object} response
  */
  notFound(req, res) {
    res.status(404).send({
      status: 404,
      message: "No found"
    });
  }

}
