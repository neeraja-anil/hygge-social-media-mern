import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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

//@desc   Update user by id
//@route  PUT /api/users/:id
//@access private

const updateUser = asyncHandler(async (req, res) => {

    const {
        firstName,
        lastName,
        picturePath,
        cloudinary_id,
        desc,
        location,
        occupation
    } = req.body

    const user = await User.findById(req.params.id)
    if (user) {
        const updatedUser = await User.findOneAndUpdate(user._id, {
            $set: {
                firstName,
                lastName,
                picturePath,
                desc,
                location,
                occupation
            }
        })
        res.status(201).json({ status: 'success', updatedUser })
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

export { getUser, getUserFriends, addRemoveFriend, updateUser }