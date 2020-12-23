const Show = require('../models/Show')

const createShow = (req) => {
  return Show.create(req.body)
}

const showById = (id) => {
  return Show.findById(id)
}

const showsByUser = (user_id) => {
  return Show.find({artists: user_id})
}

const showsByCompany = (company_id) => {
  return Show.find({company: company_id})
}

const deleteShow = (id) => {
  return Show.deleteOne({_id: id})
}

module.exports = {
  createShow,
  showById,
  showsByUser,
  showsByCompany,
  deleteShow
}