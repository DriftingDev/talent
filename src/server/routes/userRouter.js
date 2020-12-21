const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  addCompanyToUser
} = require('../controllers/user_controller')

router.post('/:id/addCompany', addCompanyToUser)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)

module.exports = router