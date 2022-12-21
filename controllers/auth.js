const Users = require("../models/users");
const authServices = require("../services/auth");



module.exports = {
    register: (req, res, next)=>{
        let data = req.body
        authServices.register(data)
        .then(resp => {
            console.log("resp",resp)
            return res.status(201).json({
                message: " Registered successfully",
                data: resp,
              });
        }).catch((err)=>{
            return res.status(500).json({
                message: "Failed",
                err
            })
        })

    },

    login: (req,res,next)=> {
        let email = req.body.email
        let password = req.body.password
        authServices.login(email,password)
        .then(resp => {
            console.log("resp",resp)
            return res.status(201).json({
                message: " logged in successfully",
                data: resp,
              });
        }).catch((err)=>{
            return res.status(500).json({
                message: "Failed",
                err
            })
        })
    }
}


