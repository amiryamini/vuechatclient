const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {

  // confirm that user typed same password twice
  if (req.body.password !== req.body.password_dup) {
    const err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("Passwords do not match");
    return next(err);
  }
  if (req.body.name &&
    req.body.email &&
    req.body.password &&
    req.body.password_dup) {

    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_dup: req.body.password_dup
    });

    User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({ success: false, msg: 'Failed to register user' });
      } else {
        res.json({ success: true, msg: 'User registered' });
      }
    });  
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// Authenticate
router.get('/authenticate', (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  User.getUserByName(name, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found.'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+ token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password.'});
      }
    });
  });
});

// Profile
//Route is currently projected
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  //res.send('PROFILE');
  res.json({user: req.user});
});

module.exports = router;