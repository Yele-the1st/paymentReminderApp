// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const Users = require('../models/users');

// let signup =  async (email, password, done) => {
//     try {
//       const user = await Users.create({ email, password });

//       return done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   }

//   let signin  = async (email, password, done) => {
//     try {
//       const user = await Users.findOne({ email });

//       if (!user) {
//         return done(null, false, { message: 'User not found' });
//       }

//       const validate = await user.isValidPassword(password);

//       if (!validate) {
//         return done(null, false, { message: 'Wrong Password' });
//       }

//       return done(null, user, { message: 'Logged in Successfully' });
//     } catch (error) {
//       return done(error);
//     }
//   }

// module.exports = {
//     signinCheck: async (req,res,next) => {
//         // ...

// passport.use(
//     'login',
//     new localStrategy(
//       {
//         username: req.body.email,
//         password: req.body.password
//       },
//       signin(username,password)
//     )
//   );

//       next();
//     }

// }
// // passport.use(
// //     'signup',
// //     new localStrategy(
// //       {
// //         usernameField: 'email',
// //         passwordField: 'password'
// //       },
// //       signup(email, password, done)
     
// //     )
// //   );

