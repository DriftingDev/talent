const passport = require('passport');
const jwt = require('jsonwebtoken')

// const userLogin = async (req, res, next) => {  
//   passport.authenticate('login', async (err, user, info) => {
//     try {
//       if(err || !user) {
//         const error = new Error('An error occured')
//         return next(error)
//       }

//       req.login(
//         user,
//         { session: false },
//         async (error) => {
//           if (error) return next(error)
//           const body = {_id: user._id, email: user.email}
//           const token = jwt.sign({user: body}, 'BERNARD_IS_BEST')
//           return res.json({token})
//         }
//       )
//     } catch (error) {
//       return next(error)
//     }
//   })(req,res,next)
// }

const userLogout = (req, res) => {
  req.logout();
  res.json({
    message: "User signed out"
  })
}

// const registerNew = (req, res, next) => {

//   passport.authenticate('signup', {session: false}), (req, res, next) => {
//     res.json({
//       message: "Signup successful",
//       user: req.user
//     })
//   }
// }

module.exports = {
  // registerNew,
  // userLogin,
  userLogout
}