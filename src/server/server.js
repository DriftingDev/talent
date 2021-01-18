const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./middleware/passport')

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const companyRouter = require('./routes/companyRouter')
const showRouter = require('./routes/showRouter')
const venueRouter = require('./routes/venueRouter')

//Check for port if in production, else use 3001
const port = process.env.PORT || 3010

//Require dotenv if running in development & set dbConn relative to this
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//Set env variable for local db URI to test version if testing
if(process.env.NODE_ENV == 'test' && process.env.NODE_ENV !== 'production') {
  process.env.LOCAL_DB_URI = 'mongodb://127.0.0.1:27017/test_talent_app'
}

//Mongo DB connection setup
const dbConn = process.env.MONGODB_URI || process.env.LOCAL_DB_URI

//Mongoose connection
mongoose.connect(dbConn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
  (err) => {
    if (err) {
      console.log('Error connecting to database', err);
    } else {
      console.log('Connected to database', dbConn)
    }
  }
);

const allowList = [
  "http://localhost:3000",
  "https://talent-app.netlify.app/",
];
app.set("trust proxy", 1);
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    const allowListIndex = allowList.findIndex((url) => url.includes(origin));
    callback(null, allowListIndex > -1);
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/company', passport.authenticate('jwt', { session: false }), companyRouter);
app.use('/show', passport.authenticate('jwt', { session: false }), showRouter);
app.use('/venue', passport.authenticate('jwt', { session: false }), venueRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

module.exports = {
  app
}