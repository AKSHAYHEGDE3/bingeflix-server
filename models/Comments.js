const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        videoId:{type:String},
        senderName:{type:String},
        text:{type:String,required:true},

    },
    {timestamps:true}
);

module.exports = mongoose.model("Comment",CommentSchema);