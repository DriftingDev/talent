const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const cors = require('cors')
const expressSession = require('express-session')
const passport = require('passport')

const authRouter = require('./routes/authRouter')

//Check for port if in production, else use 3007
const port = process.env.PORT || 3001

//Require dotenv if running in development & set dbConn relative to this
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//Set env variable for local db URI to test version if testing
if(process.env.NODE_ENV == 'test') {
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

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(expressSession({
  secret: "Bernard is a giant floof",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send("hi there") 
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

module.exports = {
  app,
  port
}