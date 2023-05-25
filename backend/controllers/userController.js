import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//@desc   Register new user
//@route  POST /api/users
//@access public 

const registerNewUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        picturePath,
        friends,
        location,
        occupation
    } = req.body

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfiles: Math.floor(Math.random() * 5000),
        impressions: Math.floor(Math.random() * 5000),
    })
    if (user)
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        })
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        const { password, ...otherData } = user._doc   //to negate password from being send
        res.json({
            ...otherData,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(404)
        throw new Error('Invalid email or password')
    }

})


export { registerNewUser, authUser }