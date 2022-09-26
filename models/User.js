const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema(
    {
        username : {
            type:String,
            required: [true, 'Please enter a name'],
            unique:[true,"username already registered"]
        },
        email : {
            type:String,
            required: [true, 'Please enter a email'],
            unique:[true,"email already registered"],
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email address']
        },
       password : {
            type:String,
        },

        isAdmin : {type:Boolean,default:false}
     
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);