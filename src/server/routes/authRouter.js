const express = require('express');
const router = express.Router();

const {
  registerNew,
  userLogin
} = require('../controllers/auth_controller');

router.post('/register', registerNew);
router.post('/login', userLogin);

module.exports = router