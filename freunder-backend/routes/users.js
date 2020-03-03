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

module.exports = router;
