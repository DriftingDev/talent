const express = require('express');
const router = express.Router();
const passport = require('passport')


const {
  getAllUsers
} = require('../controllers/user_controller')

router.get('/all', getAllUsers)
router.get('/protected', 
(req,res,next) => {
  res.json({
    message: "You win!",
    user: req.user,
    token: req.query.secret_token
  })
})

module.exports = router