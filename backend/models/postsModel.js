import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    picturePath: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, { timestamps: true })

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        //required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    picturePath: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    postPath: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: [commentSchema],
}, {
    timestamps: true
}
)

const Post = mongoose.model('Post', postSchema)
export default Post