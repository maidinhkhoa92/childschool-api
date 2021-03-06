const admin = require("../../../services/admin");
const validate = require("./validate");

module.exports.init = {
    handler: function(req, res, next) {
      const body = {
          username: "admin",
          password: "123456",
          email: "maidinhkhoa92@gmail.com"
      }
      admin
        .create(body)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          next(err);
        });
    }
};

module.exports.login = {
    Validate: validate.login,
    handler: function(req, res, next) {
      const { username, password } = req.body;
      admin
        .login(username, password)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          next(err);
        });
    }
};