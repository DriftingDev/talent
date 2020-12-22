const express = require('express');
const router = express.Router();

const {
  createNewCompany,
  getCompanyById
} = require('../controllers/company_controller');

router.post('/new', createNewCompany)
router.get("/:id", getCompanyById)

module.exports = router