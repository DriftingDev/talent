const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  addCompanyToUser,
  editUserById,
  passwordValidator
} = require('../controllers/user_controller')

router.post('/:id/addCompany', addCompanyToUser)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)
router.post('/edit', editUserById)
router.post('/validPassword', passwordValidator)

module.exports = router