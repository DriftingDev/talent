const { 
  companyById 
} = require('../utils/company_utils')
const {
  createVenue,
  venueById,
  venuesByUser,
  venuesByCompany,
  deleteVenue
} = require('../utils/venue_utils')

const createNewVenue = async (req,res) => {
  try {
    const venue = await createVenue(req)
    
    companyById(venue.company).exec((err,company) => {
      company.venues.push(venue._id)
      company.save((err, company) => {
        res.json({
          venue: venue,
          company: company
        })
      })
    })

  } catch (err) {
    
    res.status(500)
    res.json(err)
  }
}

const getVenuesByCompany = (req,res) => {
  
}

const getVenuesByUser = (req,res) => {
  
}

const getVenueById = (req,res) => {
  venueById(req.params.id).exec((err, venue) => {
    if (err) {
      res.status(500)
      res.json(err)
    }

    res.json(venue)
  })
}

const editVenueById = (req,res) => {
  
}

const destroyVenueById = (req,res) => {
  
}

module.exports = {
  createNewVenue,
  getVenuesByCompany,
  getVenuesByUser,
  getVenueById,
  editVenueById,
  destroyVenueById
}