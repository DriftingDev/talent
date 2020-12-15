const {
  allUsers
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

module.exports = {
  getAllUsers
}