const User = require('../models/User');
const passport = require('passport')

const registerNew = (req, res) => {
  const { email, password, name, nickname, is_artist, contact, link } = req.body

  User.create({email , password, name, nickname, is_artist, contact, link})
    .then(
      req.login(user, (err) => {
        if (err) {
          console.log(err)
          next(err)
        } else {
          res.redirect('/')
        }
      })
    )
}

module.exports = {
  registerNew
}