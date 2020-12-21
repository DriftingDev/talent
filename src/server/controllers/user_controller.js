const {
  allUsers,
  userById,
  getUserErrorHandle
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
      getUserErrorHandle(err, res)
    }
    return res.json(user)
  })
}

const addCompanyToUser = (req,res) => {
  userById(req).exec((err, user) => {
    if (err) {
      getUserErrorHandle(err, res)
    }

    if(user.companies.findIndex((ele) => ele == req.body.company_id) === -1) {
      user.companies.push(req.body.company_id)
      user.save((err,user) => {
      if (err) {
        res.json(err)
      }
      res.json(user)
      })
    } else {
      res.json("Company already belongs to user")
    }
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  addCompanyToUser
}