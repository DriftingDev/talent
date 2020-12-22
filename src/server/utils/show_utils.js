const Show = require('../models/Show')

const createShow = (req) => {
  return Show.create(req.body)
}

module.exports = {
  createShow
}