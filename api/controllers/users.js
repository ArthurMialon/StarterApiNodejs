import Controller from "../../lib/Controller";

export default class User extends Controller {

  /**
  *
  */
  constructor() {
    super();
  }

  /**
  * Index route
  */
  index(req, res) {
    res.send({
      message: "coucou du controller"
    });
  }

}
