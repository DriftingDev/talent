const User = require('../../models/User')
const Company = require('../../models/Company')

const dropUsers = () => {
  console.log('dropping users') 
  User.deleteMany({},(err) => {
    if (err) {
      console.log('There was a problem dropping users:', err)
    } else {
      console.log('users dropped')
    }
  })
}

const dropCompanies = () => {
  console.log('dropping companies') 
    Company.deleteMany({},(err) => {
    if (err) {
      console.log('There was a problem dropping companies:', err)
    } else {
      console.log('companies dropped')
    }
  })
}

module.exports = {
  dropUsers,
  dropCompanies
}