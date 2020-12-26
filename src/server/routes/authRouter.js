const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')

const {
  userLogout
} = require('../controllers/auth_controller');

//router.post('/register', registerNew);
router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

//router.post('/login', userLogin);
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          
          if (err || !user) {
            if (err) {
              res.status(500)
              res.json(err)
            } else {
              res.status(500)
              res.json(info)
            }
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              if (req.body.remember) {
                const body = { _id: user._id, email: user.email, is_artist: user.is_artist };
                const token = jwt.sign({ user: body }, 'BERNARD_IS_BEST');
              } else {
                const body = { _id: user._id, email: user.email, is_artist: user.is_artist };
                const token = jwt.sign({ user: body }, 'BERNARD_IS_BEST', {expiresIn: '24h'});
              }

              user.password = null

              return res.json({ 
                token: token,
                user: user
               });
            }
          );
        } catch (error) {
          res.status(500)
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router