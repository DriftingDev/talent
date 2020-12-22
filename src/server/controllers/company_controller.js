const {
 createCompany, 
 companyById
} = require('../utils/company_utils')

const { 
  userById 
} = require('../utils/user_utils')

const createNewCompany = async (req,res) => {
  try {
    const company = await createCompany(req)
    res.json(company)
  } catch (err) {
    res.json(err)
  }  
}

const getCompanyById = (req, res) => {
  companyById(req.params.id).exec((err, company) => {
    if (err) {
      res.json(err)
    }

    res.json(company)
  })
}

const getCompaniesTiedToUser = (req, res) => {

  userById(req.user._id).exec( async (err, user) => {
    if (err) {
      res.json(err)
    }

    user.populate('companies', ((err, user) => {
      if (err) {
        res.json(err)
      }

      res.json(user.companies)

    }))
  })
}

module.exports = {
  createNewCompany,
  getCompanyById,
  getCompaniesTiedToUser
}