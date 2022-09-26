const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
        title : {type:String},
        video: {type:String,default:"https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4"},
        image : {type:String},
        description : {type:String},
        duration : {type:Number},
        rating : {type:String},
        released_date : {type:Date},
        genre : {type:Array},
        isTrending : {type:Boolean,default:false},
        type:{type:String},
        casts:{type:String},
        likedPeople:{type:Array},
        dislikedPeople:{type:Array},
        comments:{type:Array}
    },
    {timestamps:true}
);

module.exports = mongoose.model("Movie",MovieSchema);