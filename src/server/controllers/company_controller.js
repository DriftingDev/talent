const {
 createCompany
} = require('../utils/company_utils')

const createNewCompany = async (req,res) => {
  try {
    const company = await createCompany(req)
    res.json(company)
  } catch (err) {
    res.json(err)
  }  
  
}

module.exports = {
  createNewCompany
}