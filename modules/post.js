const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type:String, required: true},
    body: {type: String, required: true, unique: true},
    image: {type: String, requied: true},
    user: {type: Schema.Types.ObjectId, ref:"User"}
})

const Post = mongoose.model('post',postSchema);

module.exports=Post;