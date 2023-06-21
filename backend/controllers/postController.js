import asyncHandler from "express-async-handler";
import Post from "../models/postsModel.js";

//@desc Create a post
//@route POST /api/post/create
//@access private

const createNewPost = asyncHandler(async (req, res) => {
    const { firstName, lastName, picturePath, postPath, description } = req.body

    const post = await Post.create({
        user: req.user._id,
        firstName,
        lastName,
        picturePath,
        postPath,
        description
    })
    if (post) {
        res.status(201).json('Post Created')
    } else {
        res.status(400).json('something went wrong')
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