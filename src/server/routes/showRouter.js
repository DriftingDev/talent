const express = require('express');
const router = express.Router();

const {
  createNewShow,
  editShowById,
  getShowById,
  getShowsByUser,
  getShowsByCompany,
  destroyShowById
} = require('../controllers/show_controller')

router.post("/new", createNewShow)

router.get("/showsByCompany/:id", getShowsByCompany)
router.get("/showsByUser/:id", getShowsByUser)


router.get("/:id", getShowById)
router.post("/:id", editShowById)
router.delete("/:id", destroyShowById)


module.exports = router