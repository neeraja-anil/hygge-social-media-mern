import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//@desc   Get user by id
//@route  GET /api/users/:id
//@access private

const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select('-password')
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})

export { getUser }