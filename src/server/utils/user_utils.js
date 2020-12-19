const User = require('../models/User')

const allUsers = (req) => {
  return User.find()
}

module.exports = {
  allUsers
}