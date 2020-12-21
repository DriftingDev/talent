const {
  allUsers,
  userById
} = require('../utils/user_utils')

const getAllUsers = (req, res) => {
  allUsers(req).exec((err, users) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      })
    }
    res.json(users)
  })
}

const getUserById = (req,res) => {
  userById(req).exec((err, user) => {
    if (err) {
      res.status(500);
      return res.json({
        message: 'no user found',
        error: err.message
      })
    }
    return res.json(user)
  })
}

module.exports = {
  getAllUsers,
  getUserById
}