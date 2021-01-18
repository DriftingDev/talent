const {
 createCompany, 
 companyById,
 deleteCompany
} = require('../utils/company_utils')

const { 
  userById 
} = require('../utils/user_utils')

const Company = require('../models/Company')

const createNewCompany = async (req,res,next) => {
    const company = await createCompany(req).catch(next)

    userById(company.users).exec((err, user) => {
      if(err){next(err)}
      user.companies.push(company._id)
      user.save((err, user) => {
        res.json({
          company: company
        })
      })
    })

}

const getCompanyById = (req, res, next) => {
    companyById(req.params.id).exec((err, company) => {
      if(err){
        if(!company){ err.status = 501}
        return next(err)
      }
      res.json({
        company: company
      })      
    })
  
}

const getCompaniesTiedToUser = (req, res, next) => {
    Company.find({users: req.user._id}).populate('users').populate('venues').exec((err, companies) => {
      if(err){return next(err)}
      res.json({
        companies: companies
      })
    })
 
  
}

const editCompanyById = (req,res, next) => {
    companyById(req.params.id).exec((err,company) => {
      if(err){
        if(!company){ err.status = 501}
        return next(err)
      }
      for (const [key, value] of Object.entries(req.body)) {
        company[key] = value
      }

      company.save((err, company) => {
        if(err){return next(err)}
        res.json({
          company: company
        })
      })
    })
}

const destroyCompany = (req, res, next) => {
  deleteCompany(req.params.id).exec((err) => {
    if(err){return next(err)}
    res.json("Company deleted")
  })
}

const getUsersTiedToCompany = (req, res, next) => {
  
    companyById(req.params.id).exec((err, company) => {
      if(err){
        if(!company){ err.status = 501}
        return next(err)
      }

      company.populate('users', (err,company) => {
        if(err){return next(err)}
        res.json({
          users: company.users
        })
      })
    })
  

}

module.exports = {
  createNewCompany,
  getCompanyById,
  getCompaniesTiedToUser,
  editCompanyById,
  destroyCompany,
  getUsersTiedToCompany
}