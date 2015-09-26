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
  * @param {object} req
  * @param {object} res
  * @param {function} next
  */
  index(req, res) {
    res.send('ok');
  }

}
