const {
 createCompany, 
 companyById
} = require('../utils/company_utils')

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

module.exports = {
  createNewCompany,
  getCompanyById
}