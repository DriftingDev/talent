const User = require('../models/User')

const allUsers = (req) => {
  return User.find()
}

const userById = (req) => {
  return User.findById(req.params.id)
}

module.exports = {
  allUsers,
  userById
}