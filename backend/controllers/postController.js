import asyncHandler from "express-async-handler";
import Post from "../models/postsModel.js";
import User from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";


//@desc Create a post
//@route POST /api/post/create
//@access private

const createNewPost = asyncHandler(async (req, res) => {
    const { description } = req.body
    const user = await User.findOne({ _id: req.user._id });

    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'posts' })
        console.log(result)
        const post = await Post.create({
            user: req.user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            picturePath: user.picturePath,
            postPath: result.secure_url,
            coloudinary_id: result.public_id,
            description
        })
        user.posts.push(post._id);
        const userData = await user.save();

        res.status(201).json({ status: 'success', msg: 'post uploaded', post })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);

    }

})

//@desc Get post by id
//@route GET /api/post/:id
//@access private

const getPostById = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
    if (post) {
        res.json(post)
    } else {
        throw new Error('post not found')
    }
})

//@desc DELETE post by id
//@route DELETE /api/post/:id
//@access private

const deletePost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
    if (post) {
        await post.deleteOne()
        res.json({ message: 'product removed' })

    } else {
        throw new Error('post not found')
    }
})

//@desc Get all posts
//@route GET /api/post
//@access private

const getAllPosts = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.user._id)) {
        console.log(post, 'liked')
        // await post.updateOne

    } else {
        console.log('not liked')
    }
})

export { createNewPost, getPostById, deletePost }