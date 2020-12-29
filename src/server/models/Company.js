const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const bcrypt = require('bcrypt')

const Company = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  shows: [{
    type: Schema.Types.ObjectId,
    ref: 'Show'
  }],
  venues: [{
    type: Schema.Types.ObjectId,
    ref: 'Venue'
  }],
  red61_username: String,
  red61_password: String,
  
})

module.exports = mongoose.model("Company", Company)