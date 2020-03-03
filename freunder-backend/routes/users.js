const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');


// Gets All Users
router.get('/', (req, res) => {
  User.find({}).then(users => {
    res.status(200).send({
        success: 'true',
        message: 'users retrieved successfully',
        users: users
      })
  });
});

// get User with id
router.get('/:id', (req, res) => {
  console.log('HAHAHAHAHAH')
  console.log(req.params.id)
  User
    .findOne({ _id: req.params.id })
    .then(user => {
      if (!user) {
        res.status(404).send({
          success: 'false',
          message: 'No user found',
        })
      } else {
        res.status(200).send({
        success: 'true',
        message: 'User retrieved successfully',
        user: user
      })
      }
    });
});

module.exports = router;
