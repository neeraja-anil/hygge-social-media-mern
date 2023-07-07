import asyncHandler from "express-async-handler";
import fs from 'fs'
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
        fs.unlinkSync(req.file.path);
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

    // const user = await User.findById(req.user._id)
    // const userPosts = await Post.find({ user: user._id })
    // const friendsPosts = await Promise.all(
    //     user.friends.map((id) => Post.find({ user: id }))
    // )
    // console.log('user', userPosts, 'friend', friendsPosts)
    // const allPosts = userPosts.concat(...friendsPosts)
    // res.status(200).json(allPosts)

    const allPosts = await Post.find().sort({ createdAt: -1 })
    res.status(200).json(allPosts)
})

//@desc Get all user posts
//@route GET /api/post/user/:id
//@access private

const getUserPosts = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    const userPosts = await Post.find({ user: user._id }).sort({ createdAt: -1 })
    res.status(200).json(userPosts)
})

//@desc PUT like a post by id
//@route PUT /api/post/:id/like
//@access private

const likePost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
    if (post) {
        if (!post.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } })
            res.status(200).json('you liked this post')
        } else {
            await post.updateOne({ $pull: { likes: req.user._id } })
            res.status(200).json('you unliked this post')
        }

    } else {
        throw new Error('post not found')
    }
})

//@desc PUT add a comment
//@route PUT /api/post/:id/comment
//@access private

const commentPost = asyncHandler(async (req, res) => {
    const { comment } = req.body
    console.log(req.body)
    const post = await Post.findById(req.params.id)
    if (post) {
        const comments = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            comment,
            user: req.user._id,
            picturePath: req.user.picturePath
        }
        post.comments.unshift(comments)
        await post.save()
        res.status(201).json('comment added')
    } else {
        throw new Error('post not found')
    }
})

export { createNewPost, getPostById, deletePost, getAllPosts, getUserPosts, likePost, commentPost }