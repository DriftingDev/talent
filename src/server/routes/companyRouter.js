const express = require('express');
const router = express.Router();

const {
  createNewCompany,
  getCompanyById,
  getCompaniesTiedToUser,
  editCompanyById,
  destroyCompany
} = require('../controllers/company_controller');

router.get("/userCompanies", getCompaniesTiedToUser)
router.post('/new', createNewCompany)
router.get("/:id", getCompanyById)
router.post("/:id", editCompanyById)
router.delete("/:id", destroyCompany)

module.exports = router