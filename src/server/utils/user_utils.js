const User = require('../models/User')
const Company = require('../models/Company')

const allUsers = (req) => {
  return User.find()
}

const userById = (req) => {
  return User.findById(req.params.id)
}

const addCompany = (req) => {
  return User.findByIdAndUpdate(req.params.id, req.body.company)
}

const getUserErrorHandle = (err, res) => {
  res.status(500);
    return res.json({
      message: 'no user found',
      error: err.message
    })
}

const userUpdate = (req) => {
  console.log(req.body)
  return User.findByIdAndUpdate(req.user._id, req.body, { new: true })
}

module.exports = {
  allUsers,
  userById,
  addCompany,
  getUserErrorHandle,
  userUpdate
}