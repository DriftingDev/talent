const express = require('express');
const router = express.Router();

const {
  createNewShow
} = require('../controllers/show_controller')

// router.get("/showsByCompany")
// router.get("/showsByUser")

router.post("/new", createNewShow)
// router.post("/addUserToShow")

// router.get("/:id")
// router.post("/:id")
// router.delete("/:id")


module.exports = router