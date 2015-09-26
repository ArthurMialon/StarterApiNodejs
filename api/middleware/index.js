export default {

  first(req, res, next) {
    return res.send("ok c'est bon");
  },

  second(req, res, next) {
    return res.send("ok c'est le deuxieme");
  }

};
