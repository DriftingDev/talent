const User = require('../../models/User.js')

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

module.exports = {
  dropUsers
}