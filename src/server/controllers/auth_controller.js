const User = require('../models/User');
const passport = require('passport')

const registerNew = (req, res) => {
  const { email, password, name, nickname, is_artist, contact, link } = req.body

  new User({email:email, password:password, name:name, nickname:nickname, is_artist:is_artist, contact:contact, link:link}).save((err, user) => {
    if (err) {
      res.status(500)
      res.send(err)
    } else {
      res.send('Ya win')
    }
  })
}

module.exports = {
  registerNew
}