const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Load User model
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(400).send({
      success: "false",
      messages: errors,
      register_data: req.body
    });
    return;
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.status(400).send({
          success: "false",
          messages: errors,
          register_data: req.body
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.createdEvents = [];
            newUser.attendedEvents = [];
            newUser
              .save()
              .then(user => {
                jwt.sign(
                  {
                    exp: Math.floor(Date.now() / 1000) + 180 * 60,
                    user: user
                  },
                  "secretkey",
                  (err, token) => {
                    res.status(200).send({
                      success: "true",
                      message: "You are now registered and can log in",
                      user: user,
                      token: token
                    });
                    return;
                  }
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    // Match email
    if (!user) {
      res.status(401).send({
        success: "false",
        message: "That email is not registered"
      });
      return;
    }

    // Match password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            user: user
          },
          "secretkey",
          (err, token) => {
            res.status(200).send({
              success: "true",
              message: "Successfully logged in",
              user: user,
              token: token
            });
            return;
          }
        );
      } else {
        res.status(401).send({
          success: "false",
          message: "Password incorrect"
        });
        return;
      }
    });
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send({
    success: "true",
    message: "Successfully logged out",
    user: user
  });
});

module.exports = router;
