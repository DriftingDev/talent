const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
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

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        user.password = null
        let token = jwt.sign({ user: user }, process.env.JWT_SECRET);

        return res.json({
          token: token,
          user: user,
        });
      });
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })(req, res, next);
});

router.get(
  '/checkToken',
  passport.authenticate('jwt', { session: false }),
  (req,res) => {
    res.json({
      user: req.user
    })
  }
)

module.exports = router;
