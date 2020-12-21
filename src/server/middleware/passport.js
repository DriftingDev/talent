const passport = require('passport')
const User = require('../models/User')
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.create({email, password});
        return done(null, user);
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'login', 
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {message: "Wrong password"});
        }

        return done(null, user, {message:'Logged in successfully'})
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'BERNARD_IS_BEST'
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error)
      }
    }
  )
)