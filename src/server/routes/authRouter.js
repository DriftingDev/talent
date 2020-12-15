const express = require('express');
const router = express.Router();

const {
  registerNew,
  userLogin,
  userLogout
} = require('../controllers/auth_controller');

router.post('/register', registerNew);
router.post('/login', userLogin);
router.get('/logout', userLogout)

module.exports = router