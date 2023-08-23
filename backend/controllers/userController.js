import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'
import bcrypt from 'bcrypt'


//@desc   Get user by id
//@route  GET /api/users/:id
//@access private

const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})

//@desc   Get all users 
//@route  GET /api/users/
//@access private

const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select('-password')
    res.status(200).json(users)
})

//@desc   Update user profile
//@route  PUT /api/users/profile/edit
//@access private

const updateUser = asyncHandler(async (req, res) => {

    const {
        firstName,
        lastName,
        desc,
        location,
        occupation
    } = req.body


    try {

        const user = await User.findById(req.user._id)
        let picturePath = user.picturePath
        let cloudinary_id = user.cloudinary_id

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file?.path, { folder: 'avatars' })
            console.log(result)
            picturePath = result?.secure_url
            cloudinary_id = result.public_id
            fs.unlinkSync(req.file.path);
        }

        if (user) {
            const updatedUser = await User.findOneAndUpdate(user._id, {
                $set: {
                    firstName,
                    lastName,
                    picturePath,
                    cloudinary_id,
                    desc,
                    location,
                    occupation
                }
            })
            if (updateUser) {
                res.status(201).json({ status: 'success', updatedUser })
            } else {
                res.status(400)
                throw new Error('something went wrong')
            }
        } else {
            res.status(404)
            throw new Error('User not Found')
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }

})

//@desc   update user password by id
//@route  patch /api/users/:id
//@access private

const updatePassword = asyncHandler(async (req, res) => {
    const { phone, password } = req.body
    if (!password || !phone) {
        res.status(400);
        throw new Error('Data missing');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.findOneAndUpdate({ phone: phone }, { password: hashedPassword }).select('-password')
    if (user) {
        res.status(201).json({ status: 'success', msg: 'password updated succesfully' })
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})


//@desc   Get user friends by id
//@route  GET /api/users/:id/friends
//@access private

const getUserFriends = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id).select('-password'))
    )

    const formattedFriends = friends.map(({ _id, firstName, lastName, picturePath, posts }) => {
        return { _id, firstName, lastName, picturePath, posts }
    })
    res.json(formattedFriends)
})

//@desc   Add or Remove friends/followers
//@route  PUT /api/users/:id/addfriend
//@access private
const addRemoveFriend = asyncHandler(async (req, res) => {

    if (!req.user._id.equals(req.params.id)) {
        try {
            const friend = await User.findById(req.params.id)
            const user = await User.findById(req.user._id)
            if (!user.friends.includes(req.params.id)) {
                await user.updateOne({ $push: { friends: req.params.id } })
                await friend.updateOne({ $push: { followers: req.user._id } })

                res.status(200).json('followed')
            } else {
                await user.updateOne({ $pull: { friends: req.params.id } })
                await friend.updateOne({ $pull: { followers: req.user._id } })
                res.status(200).json('unfollowed')
            }
        } catch (err) {
            console.log(err)
            res.status(500)
            throw new Error('something went wrong, try again')
        }
    } else {
        res.json('you cant follow yourself')
    }
})

export { getUser, getAllUsers, getUserFriends, addRemoveFriend, updateUser, updatePassword }