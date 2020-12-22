const Company = require('../models/Company')

const createCompany = (req) => {
  const {name, red61_username, red61_password} = req.body
  return Company.create({ name, red61_username, red61_password })
}

const companyById = (id) => {
  return Company.findById(id)
}

const deleteCompany = (id) => {
  return Company.deleteOne({_id: id})
}

module.exports = {
  createCompany,
  companyById,
  deleteCompany
}