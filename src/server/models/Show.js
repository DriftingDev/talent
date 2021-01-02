const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const moment = require('moment')

const Show = new Schema ({
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue'
  },
  artists: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  showName: {
    type: String,
    required: true
  },
  eventStart: {
    type: Date,
    required: true
  },
  eventEnd: {
    type: Date,
    required: true
  },
  descrip: {
    type: String
  },
  is_completed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Show", Show)