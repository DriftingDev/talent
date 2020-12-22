const {
  allUsers,
  userById,
  getUserErrorHandle,
  deleteUser
} = require('../utils/user_utils')

const {
  companyById
} = require('../utils/company_utils');
const { json } = require('body-parser');

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
  userById(req.params.id).exec((err, user) => {
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
  userById(req.user._id).exec((err,user) => {
    if (err) {
      res.json(err)
    }

    for (const [key, value] of Object.entries(req.body)) {
      user[key] = value
    }

    user.save((err, user) => {
      if(err) {
        res.json(err)
      }

      res.json(user)
    })
    
  })
}

const passwordValidator =  (req, res) => {
  
  userById(req.user._id).exec( async (err,user) => {
    if (err) {
      res.json(err)
    }

    const bool = await user.isValidPassword(req.body.password)

    res.json(bool)
  })
}

const destroyUser = (req, res) => {
  deleteUser(req.user._id).exec((err) => {
    if (err) {
      res.json(err)
    }
    
    res.json("user deleted")
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  addCompanyToUser,
  editUserById,
  passwordValidator,
  destroyUser
}