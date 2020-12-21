const {
  allUsers,
  userById,
  getUserErrorHandle,
  userUpdate
} = require('../utils/user_utils')

const {
  companyById
} = require('../utils/company_utils')

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
    } else if (!user) {
      res.json("No user found")
    }

    if(user.companies.findIndex((ele) => ele == req.body.company_id) === -1) {
      user.companies.push(req.body.company_id)
      user.save((err,user) => {

      if (err) {
        res.json(err)
      }

      companyById(req).exec((err,company) => {

        if (err) {
          res.json(err)
        }

        company.users.push(user._id)
        company.save((err, savedCompany) => {
          if (err) {
            res.json(err)
          }

          res.json({
            user: user,
            company: savedCompany
          })
        })
      })

      })
    } else {
      res.json("Company already belongs to user")
    }
  })
}

const editUserById = (req,res) => {
  userUpdate(req).exec((err,user) => {
    if (err) {
      res.json(err)
    }

    res.json(user)
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  addCompanyToUser,
  editUserById
}