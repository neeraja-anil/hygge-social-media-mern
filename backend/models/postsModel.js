import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
    comments: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
}
)

const Post = mongoose.model('Post', postSchema)
export default Post