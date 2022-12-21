const Users = require('../models/users')
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const tokenGen = require("../utils/tokenGen");
const moment =  require("moment");

module.exports = {
    register: async (data) => {
        let params = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            role: data.role
        }
       let user = await Users.create(params).catch((err)=> {
            throw err
       })

        let respObj = {
                firstname: user.firstname,
                email: user.email,
                lastname: user.lastname,
                active: user.active
            }
        
        return respObj
        
    },

    login: async (email,password) => {
        //check if user email exists
        let user = await Users.findOne({where: {email}}).select('+password').catch((err)=> {
            throw err
        })

        if(!user){ throw Error("User Not Found,Please Signup") }
        //validate user password
        let validatePassword = await user.comparePassword(password,user.password)

        if(!validatePassword ){ throw Error("Invalid Password/Email") }

        //check for active sessions
        if(user.sessionToken){
            jwt.verify(user.sessionToken,process.env.JWT_SECRET,function(error,jwtdecoded){
                if(!error && jwtdecoded){
                    throw Error("You already have an active session,kindly signout")
                }
            })
        }

        //create session token 
        let sessionToken = tokenGen.signToken(email)

        //save session token
        user.sessionToken = sessionToken
        user.lastLogin = moment().format()
        await user.save()

        let respObj = {
            firstname: user.firstname,
            email: user.email,
            token: user.sessionToken,
            active: user.active
        }
        return respObj

    }

   
}