const express = require('express');
const router = express.Router();

const {
  createNewCompany,
  getCompanyById,
  getCompaniesTiedToUser,
  getUsersTiedToCompany,
  editCompanyById,
  destroyCompany
} = require('../controllers/company_controller');

router.get("/companyUsers/:id", getUsersTiedToCompany)
router.get("/userCompanies", getCompaniesTiedToUser)
router.post('/new', createNewCompany)
router.get("/:id", getCompanyById)
router.post("/:id", editCompanyById)
router.delete("/:id", destroyCompany)

module.exports = router