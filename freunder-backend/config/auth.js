const jwt = require('jsonwebtoken');

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }   
  },
  verifyToken: function(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;

      jwt.verify(req.token, 'secretkey', (err) => {
        if(err) {
          res.sendStatus(403);
        }
      });
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
};
