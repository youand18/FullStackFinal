const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
  let {
    email,
    password,
  } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ error: "email already exists" }] });
      } else {
        const user = new User({
          email: email,
          password: password,
          appData: {
            Wins: 0
          }
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ error: "required" });
  }
  else if (!emailRegexp.test(email)) {
    errors.push({ error: "invalid email" });
  }
  else if (!password) {
    errors.push({ error: "required" });
  }
  else if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ error: "Incorrect Email or Password" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ error: "Incorrect Email or Password" }] });
            }
            let access_token = createJWT(user.email, user._id, "10h");
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    appData: user.appData,
                    user: user.email
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};
