const {
  allUsers,
  userById,
  getUserErrorHandle,
  deleteUser
} = require('../utils/user_utils')

const {
  companyById
} = require('../utils/company_utils');

const getAllUsers = (req, res) => {
  try {
    allUsers(req).exec((err, users) => {
      res.json({
        users: users
      })
    })
    
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

const getUserById = (req,res) => {
  try {
    userById(req.params.id).exec((err, user) => {
      if(user){
        res.json({
          user: user
        })
      } else {
        res.status(500)
        res.json("No user found")
      }
    })
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

const addCompanyToUser = (req,res) => {
  try {
    userById(req.params.id).exec((err, user) => {
      if (!user) {
        res.status(500)
        return res.json("No user found")
      }
  
      if(user.companies.findIndex((ele) => ele == req.body.company_id) === -1) {
        
        companyById(req.body.company_id).exec((err,company) => {
          if (!company) {
            res.status(500)
            return res.json("No company found")
          }
          
          user.companies.push(req.body.company_id)
          user.save((err,user) => {
            company.users.push(user._id)
            company.save((err, savedCompany) => {
  
              res.json({
                user: user,
                company: savedCompany
              })
            })
          })
        })
      } else {
        res.status(500)
        res.json("Company already belongs to user")
      }
    })
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

const editUserById = (req,res) => {
  try {
    userById(req.user._id).exec((err,user) => {
      
      for (const [key, value] of Object.entries(req.body)) {
        user[key] = value
      }
  
      user.save((err, user) => {
  
        res.json({
          user: user
        })
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const passwordValidator =  (req, res) => {
  try {
    userById(req.user._id).exec( async (err,user) => {
      const bool = await user.isValidPassword(req.body.password)
  
      res.json({
        passwordBool: bool
      })
    }) 
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const destroyUser = (req, res) => {
  try {
    deleteUser(req.user._id).exec((err) => {    
      res.json("User deleted")
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addCompanyToUser,
  editUserById,
  passwordValidator,
  destroyUser
}