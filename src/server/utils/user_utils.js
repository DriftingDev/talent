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

const getUserErrorHandle = (err, res) => {
  res.status(500);
    return res.json({
      message: 'no user found',
      error: err.message
    })
}



module.exports = {
  allUsers,
  userById,
  addCompany,
  getUserErrorHandle
}