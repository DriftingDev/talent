const User = require('../../models/User')
const Company = require('../../models/Company')
const Show = require('../../models/Show')
const Venue = require('../../models/Venue')

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

const dropShows = () => {
  console.log('dropping shows') 
    Show.deleteMany({},(err) => {
    if (err) {
      console.log('There was a problem dropping shows:', err)
    } else {
      console.log('shows dropped')
    }
  })
}

const dropVenues = () => {
  console.log('dropping venues') 
    Venue.deleteMany({},(err) => {
    if (err) {
      console.log('There was a problem dropping venues:', err)
    } else {
      console.log('venues dropped')
    }
  })
}

module.exports = {
  dropUsers,
  dropCompanies,
  dropShows,
  dropVenues
}