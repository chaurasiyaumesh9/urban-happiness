const User = require("../../models/User");
const cloudinary = require("cloudinary");

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
    if (!req.body || !req.files) {
      return;
    }
    let userRawData = {
      accountHolderName: req.body.accountHolderName,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
      userType: req.body.userType,
      gender: req.body.gender,
      addressProof: {
        type: req.body.addressProofType,
        document: {}
      },
      idProof: {
        type: req.body.idProofType,
        document: {}
      },
      photo: {}
    };
    let promiseAddressProof = cloudinary.uploader.upload(
      req.files["addressProof"]["path"]
    );
    let promiseIdProof = cloudinary.uploader.upload(
      req.files["idProof"]["path"]
    );
    let promisePhoto = cloudinary.uploader.upload(req.files["photo"]["path"]);

    Promise.all([promiseAddressProof, promiseIdProof, promisePhoto])
      .then(results => {
        userRawData.addressProof.document = results[0];
        userRawData.idProof.document = results[1];
        userRawData.photo = results[2];
        let NewUser = new User(userRawData);
        NewUser.save()
          .then(user => res.json(user))
          .catch(err => next(err));
      })
      .catch(err => res.status(400).json(err));
  });
  app.put("/api/users/:id", (req, res, next) => {
    if (!req.body) {
      return;
    }
    let userRawData = {
      accountHolderName: req.body.accountHolderName,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
      userType: req.body.userType,
      gender: req.body.gender,
      addressProof: {
        type: req.body.addressProofType
      },
      idProof: {
        type: req.body.idProofType
      },
      photo: {}
    };

    let promises = [];

    User.findById(req.params.id)
      .exec()
      .then(user => {
        if (req.files["addressProof"]) {
          promises.push(
            cloudinary.uploader
              .upload(req.files["addressProof"]["path"])
              .then(result => {
                userRawData.addressProof["document"] = result;
              })
          );
          promises.push(
            cloudinary.uploader.destroy(user.addressProof.document["public_id"])
          );
        } else {
          userRawData.addressProof["document"] = JSON.parse(
            req.body.addressProof
          );
        }
        if (req.files["idProof"]) {
          promises.push(
            cloudinary.uploader
              .upload(req.files["idProof"]["path"])
              .then(result => {
                userRawData.idProof["document"] = result;
              })
          );
          promises.push(
            cloudinary.uploader.destroy(user.idProof.document["public_id"])
          );
        } else {
          userRawData.idProof["document"] = JSON.parse(req.body.idProof);
        }
        if (req.files["photo"]) {
          promises.push(
            cloudinary.uploader
              .upload(req.files["photo"]["path"])
              .then(result => {
                userRawData.photo = result;
              })
          );
          promises.push(cloudinary.uploader.destroy(user.photo["public_id"]));
        } else {
          userRawData.photo = JSON.parse(req.body.photo);
        }
        Promise.all(promises)
          .then(() => {
            //console.log("then userRawData", userRawData);
          })
          .finally(() => {
            //console.log("finally userRawData", userRawData);
            User.findOneAndUpdate(
              { _id: req.params.id },
              { $set: userRawData },
              { new: true, useFindAndModify: false }
            )
              .then(user => res.json(user))
              .catch(err => next(err));
          })
          .catch(err => res.status(400).json(err));
      });
  });

  app.delete("/api/users/:id", function(req, res, next) {
    User.findById(req.params.id)
      .exec()
      .then(user => {
        let values = [
          user.addressProof.document.public_id,
          user.idProof.document.public_id,
          user.photo.public_id
        ];
        const promises = values.map(publicid =>
          cloudinary.uploader.destroy(publicid)
        );
        Promise.all(promises)
          .then(results => {
            User.findOneAndRemove({ _id: user._id })
              .exec()
              .then(() => {
                res.json({});
              })
              .catch(err => next(err));
          })
          .catch(err => res.status(400).json(err));
      });

    // User.findOneAndRemove({ _id: req.params.id })
    //   .exec()
    //   .then(() => {
    //     res.json({});
    //   })
    //   .catch(err => next(err));
  });
};
