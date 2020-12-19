const express = require('express');
const router = express.Router();

const {
  getAllUsers
} = require('../controllers/user_controller')

router.get('/all', getAllUsers)

module.exports = router