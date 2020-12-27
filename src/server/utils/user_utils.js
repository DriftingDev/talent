const User = require('../models/User')
const Company = require('../models/Company')


const allUsers = (req) => {
  return User.find()
}

const userById = (id) => {
  return User.findById(id)
}

const addCompany = (req) => {
  return User.findByIdAndUpdate(req.params.id, req.body.company)
}

const deleteUser = (id) => {
  return User.deleteOne({_id: id})
}

module.exports = {
  allUsers,
  userById,
  addCompany,
  deleteUser
}