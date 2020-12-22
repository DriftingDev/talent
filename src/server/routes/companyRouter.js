const express = require('express');
const router = express.Router();

const {
  createNewCompany,
  getCompanyById,
  getCompaniesTiedToUser
} = require('../controllers/company_controller');

router.get("/userCompanies", getCompaniesTiedToUser)
router.post('/new', createNewCompany)
router.get("/:id", getCompanyById)

module.exports = router