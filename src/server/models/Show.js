const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const moment = require('moment')

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

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
  showNameSlug: String,
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

Show.pre(
  'save',
  async function(next) {
    let show = this;
    if (show.isNew || show.isModified('showName')){
      const slug = slugify(show.showName)
      show.showNameSlug = slug;
      next();
    } else {
      next();
    }
  }
);

module.exports = mongoose.model("Show", Show)