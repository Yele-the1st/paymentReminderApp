const mongoose = require("mongoose");
const moment =  require("moment");
const bcrypt = require("bcryptjs");



const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim:true
    },

    email: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },

    lastname: {
        type: String,
        required: true,
        trim:true
    },

    photo: {
        type: String
    },

    role: {
        type:String,
        enum:['admin','user'],
        default: 'user'
    },

    password:{
        type:String,
        require:[true,"Kindly provide a password"],
        minlength: 8,
        select: false

    },

    passwordConfirm: {
        type: String,
        require: [true, "Kindly re-enter your password"],
        validate: {
            validator: function(password){
                return password === this.password
            }
        },
        message: "Passwords do not match"
    },

    active: {
        type: Number,
        default: 0,
        enum: [0,1]

    },

    dateCreated: {
        type: Date,
        default: moment().format()
    },

    dateDeleted: {
        type: Date
    },

    dateUpdated: {
        type: Date
    },

    passwordResetToken: {
        type: String,
    },

    passwordResetExpires: {
        type: Date,
    },

    sessionToken: {
        type: String
    },

    lastLogin: {
        type: Date,
        default:moment().format()
    }


});

userSchema.pre('save', async function(next){
    if(!(this.isModified("password"))){
        return next()}
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.comparePassword = async function(password,userpass,isMatch) {
    const compare = await bcrypt.compare(password, userpass).catch(err=>{
        throw err
    })

    return compare

    };

// userSchema.methods.isValidPassword = async function(password){
//     console.log("here");
//     const compare = await bcrypt.compare(password, this.password);

//     return compare
// };


const Users = mongoose.model('User',userSchema)

module.exports = Users

