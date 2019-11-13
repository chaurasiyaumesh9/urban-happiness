const User = require("../../models/User");

module.exports = app => {
  app.get("/api/users", (req, res, next) => {
    User.find()
      .exec()
      .then(users => res.json(users))
      .catch(err => next(err));
  });

  app.get("/api/users/:id", (req, res, next) => {
    User.findById(req.params.id)
      .exec()
      .then(user => res.json(user))
      .catch(err => next(err));
  });

  app.post("/api/users", function(req, res, next) {
    if (!req.body.user) {
      return;
    }
    let userRawData = req.body.user;
    let NewUser = new User(userRawData);
    NewUser.save()
      .then(user => res.json(user))
      .catch(err => next(err));
  });
  app.put("/api/users/:id", (req, res, next) => {
    if (!req.body.user) {
      return;
    }
    let updatedUser = req.body.user;
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedUser },
      { new: true, useFindAndModify: false }
    )
      .then(user => res.json(user))
      .catch(err => next(err));
  });

  app.delete("/api/users/:id", function(req, res, next) {
    User.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(user => res.json({}))
      .catch(err => next(err));
  });
};
