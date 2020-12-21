const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const bcrypt = require('bcrypt')

const User = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  
  accname: {
    type: String
    //required: true
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

User.pre(
  'save',
  async function(next) {
    let user = this;
    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;
    next();
  }
);

User.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

module.exports = mongoose.model('User', User)