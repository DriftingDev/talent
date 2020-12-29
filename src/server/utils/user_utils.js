const User = require('../models/User')


const allUsers = (req) => {
  return User.find()
}

const userById = (id) => {
  return User.findById(id)
}

const deleteUser = (id) => {
  return User.deleteOne({_id: id})
}

module.exports = {
  allUsers,
  userById,
  deleteUser
}