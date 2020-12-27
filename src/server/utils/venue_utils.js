const Venue = require('../models/Venue')

const createVenue = (req) => {
  return Venue.create(req.body)
}

const venueById = (id) => {
  return Venue.findById(id)
}
const venuesByCompany = (company_id) => {
  return Venue.find({company: company_id})
}

const deleteVenue = (id) => {
  return Venue.deleteOne({_id: id})
}

module.exports = {
  createVenue,
  venueById,
  venuesByCompany,
  deleteVenue
}