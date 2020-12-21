const Company = require('../models/Company')

const createCompany = (req) => {
  const {name, red61_username, red61_password} = req.body
  return Company.create({ name, red61_username, red61_password })
}

module.exports = {
  createCompany
}