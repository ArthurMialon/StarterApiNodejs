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
  * Sign up route
  * @param {object} req
  * @param {object} res
  * @param {function} next
  */
  signup(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({message: 'Missing credentials username'});
      return;
    }

    /* User send in the body */
    let user_send = {
      username  : req.body.username,
      password  : req.body.password,
      first_name: req.body.first_name,
      last_name : req.body.last_name
    };

    this.User
    .findOne({username: user_send.username})
    .then( (user) => {
      if (user)
        return res.status(401).json({message: 'Username already exist'});
      return this.User.create(user_send);
    })
    .then( (user) => {
      if (!res.headersSent)
        return res.json(user);
    })
    .catch( (err) => {
      console.log(err);
      res.status(400).send({message: "Something went wrong. Arguments are missing"});
    });
  }


  /**
  * Login user route
  * @param {object} req
  * @param {object} res
  * @param {function} next
  */
  login(req, res) {
    res.send(req.token);
  }

}
