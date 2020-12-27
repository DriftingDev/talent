const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const Venue = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  shows: [{
    type: Schema.Types.ObjectId,
    ref: 'Show',
  }],
  name: {
    type: String,
    required: true
  },
  address: String,
  contactEmail: String,
  contactPhone: String,
  capacity: Number,
  details: String,
  website: String
})

module.exports = mongoose.model('Venue', Venue)