const {
 createCompany, 
 companyById,
 deleteCompany
} = require('../utils/company_utils')

const { 
  userById 
} = require('../utils/user_utils')

const Company = require('../models/Company')

const createNewCompany = async (req,res) => {
  try {
    const company = await createCompany(req)

    userById(company.users).exec((err, user) => {
      user.companies.push(company._id)
      user.save((err, user) => {
        res.json({
          company: company
        })
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }  
}

const getCompanyById = (req, res) => {
  try {
    companyById(req.params.id).exec((err, company) => {
      if (company) {
        res.json({
          company: company
        })
      } else {
        res.status(500)
        res.json("No company found")
      }
      
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const getCompaniesTiedToUser = (req, res) => {
  try {
    Company.find({users: req.user._id}).populate('users').populate('venues').exec((err, companies) => {
      res.json({
        companies: companies
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json(err)
  }
  
}

const editCompanyById = (req,res) => {
  try {
    companyById(req.params.id).exec((err,company) => {
      if (!company) {
        res.status(500)
        return res.json("No company found")
      }
      for (const [key, value] of Object.entries(req.body)) {
        company[key] = value
      }

      company.save((err, company) => {
        res.json({
          company: company
        })
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }  
}

const destroyCompany = (req, res) => {
  try {
    deleteCompany(req.params.id).exec((err) => {
      res.json("Company deleted")
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const getUsersTiedToCompany = (req, res) => {
  try {
    companyById(req.params.id).exec((err, company) => {
      
      if(!company) {
        res.status(500)
        return res.json("No company found")
      }

      company.populate('users', (err,company) => {
        res.json({
          users: company.users
        })
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }

}

module.exports = {
  createNewCompany,
  getCompanyById,
  getCompaniesTiedToUser,
  editCompanyById,
  destroyCompany,
  getUsersTiedToCompany
}