const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')

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

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          
          if (err) {
            res.status(500)
            return res.json(err)
          } else if (!user) {
            res.status(500)
            return res.json(info)
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              let body;
              let token;

              if (req.body.remember) {
                body = { _id: user._id, email: user.email, is_artist: user.is_artist };
                token = jwt.sign({ user: body }, 'BERNARD_IS_BEST');
              } else {
                body = { _id: user._id, email: user.email, is_artist: user.is_artist };
                token = jwt.sign({ user: body }, 'BERNARD_IS_BEST', {expiresIn: '24h'});
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