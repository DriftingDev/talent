const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema ({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  is_artist: {
    type: Boolean,
    default: false
  },
  contact: {
    type: String
  },
  link: {
    type: String
  },
  companies: [{
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }]
})

User.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model('User', User)