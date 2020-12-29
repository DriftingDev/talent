const { 
  companyById 
} = require('../utils/company_utils')

const { 
  showsByUser 
} = require('../utils/show_utils')

const {
  createVenue,
  venueById,
  venuesByCompany,
  deleteVenue
} = require('../utils/venue_utils')

const createNewVenue = (req,res) => {
  try {

    companyById(req.body.company).exec( async (err,company) => {
      if(!company){
        res.status(500)
        return res.json("No company found")
      }

      const venue = await createVenue(req)
    
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
  if (req.user.is_artist) {
    res.status(401)
    return res.json('Unauthorized')
  }
  try {
    venuesByCompany(req.params.id).exec((err, venues) => {
      if(!venues){
        res.status(500)
        return res.json("No venues found")
      }
      res.json({
        venues: venues
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const getVenuesByUser = (req,res) => {
  try {
    showsByUser(req.user._id).exec((err, shows) => {
      if (shows.length == 0) {
        res.status(500)
        return res.json("No venues attached to user")
      } else {
        let venueArray = []
        shows.forEach(async (show, index, array) => {
          await show.populate('venue').execPopulate()
          venueArray.push(show.venue)
          if (index + 1 === array.length) {
            const uniqueVenues = venueArray.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
            res.json(uniqueVenues)
          }
        })
      }
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const getVenueById = (req,res) => {
  try {
    venueById(req.params.id).exec((err, venue) => {
      if(!venue){
        res.status(500)
        return res.json('No venue found')
      }
      res.json({
        venue: venue
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const editVenueById = (req,res) => {
  try {
    venueById(req.params.id).exec((err,venue) => {
      if(!venue) {
        res.status(500)
        return res.json("No venue found")
      }
      
      for (const [key, value] of Object.entries(req.body)) {
        venue[key] = value
      }

      venue.save((err, venue) => {
        res.json({
          venue: venue
        })
      })
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const destroyVenueById = (req,res) => {
  try {
    deleteVenue(req.params.id).exec((err) => {
      res.json("Venue deleted")
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
  
}

module.exports = {
  createNewVenue,
  getVenuesByCompany,
  getVenuesByUser,
  getVenueById,
  editVenueById,
  destroyVenueById
}