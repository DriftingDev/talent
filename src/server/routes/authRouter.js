const express = require('express');
const router = express.Router();

const {
  registerNew
} = require('../controllers/auth_controller');

router.post('/register', registerNew);

module.exports = router