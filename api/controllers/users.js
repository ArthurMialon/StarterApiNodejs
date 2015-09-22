import Controller from "../../lib/Controller";

export default class User extends Controller {

  /**
  * Constructor
  */
  constructor() {
    super();

    // Load useful models
    this.User = this.loadModel('user');
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
