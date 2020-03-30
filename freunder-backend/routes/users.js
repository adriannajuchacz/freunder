const express = require("express");
const router = express.Router();
// Load User model
const User = require("../models/User");

// Gets All Users
router.get("/", (req, res) => {
  User.find({}).then(users => {
    res.status(200).send({
      success: "true",
      message: "users retrieved successfully",
      users: users
    });
  });
});

// get User with id
router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then(user => {
    if (!user) {
      res.status(404).send({
        success: "false",
        message: "No user found"
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "User retrieved successfully",
        user: user
      });
    }
  });
});

// get User with id
router.put("/:id", (req, res) => {
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
    const updatedUser = new User({
      name,
      email,
      password
    });
    User.findOne({ _id: req.params.id }).then(user => {
      if (!user) {
        res.status(404).send({
          success: "false",
          message: "No user found"
        });
      } else {
        user.delete()
        updatedUser.save()
        res.status(200).send({
          success: "true",
          message: "User updated successfully",
          user: updatedUser
        });
      }
    });
  }
});

// delete User with id
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(user => {
    if (!user) {
      res.status(404).send({
        success: "false",
        message: "No user found"
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "User deleted successfully",
        user: user
      });
    }
  });
});

module.exports = router;
