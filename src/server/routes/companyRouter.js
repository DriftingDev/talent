const express = require('express');
const router = express.Router();

const {
  createNewCompany
} = require('../controllers/company_controller')

router.post('/new', createNewCompany)

module.exports = router