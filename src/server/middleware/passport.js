const passport = require('passport')
const User = require('../models/User')
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const { accname, nickname, is_artist, contact, link } = req.body
        const user = await User.create({email, password, accname, nickname, is_artist, contact, link});
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
      secretOrKey: process.env.JWT_SECRET
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