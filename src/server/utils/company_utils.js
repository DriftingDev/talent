const Company = require('../models/Company')

const createCompany = (req) => {
  return Company.create({users: req.user._id, ...req.body})
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