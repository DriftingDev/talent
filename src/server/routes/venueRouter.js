const express = require('express');
const router = express.Router();

const {
  createNewVenue,
  getVenuesByCompany,
  getVenuesByUser,
  getVenueById,
  editVenueById,
  destroyVenueById
} = require('../controllers/venue_controller')

router.post("/new", createNewVenue)

router.get("/venuesByCompany/:id", getVenuesByCompany)
router.get("/venuesByUser/", getVenuesByUser)

router.get("/:id", getVenueById)
router.post("/:id", editVenueById)
router.delete("/:id", destroyVenueById)

module.exports = router