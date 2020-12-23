const Venue = require('../models/Venue')

const createVenue = (req) => {
  return Venue.create(req.body)
}

const venueById = (id) => {
  return Venue.findById(id)
}

const venuesByUser = (user_id) => {
  
}

const venuesByCompany = (company_id) => {
  
}

const deleteVenue = (id) => {
  
}

module.exports = {
  createVenue,
  venueById,
  venuesByUser,
  venuesByCompany,
  deleteVenue
}