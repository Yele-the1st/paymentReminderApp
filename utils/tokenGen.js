const jwt = require('jsonwebtoken');

module.exports = {
    signToken: (email)=>{
       return jwt.sign({
            data: email
          }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES});

    }
}