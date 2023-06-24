import jwt from 'jsonwebtoken'
import twilio from 'twilio'
import fs from 'fs'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import cloudinary from "../utils/cloudinary.js";
import User from '../models/userModel.js'

let client


//@desc   Register new user
//@route  POST /api/auth/users
//@access public 

const registerNewUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        picturePath,
    } = req.body

    if (!firstName || !lastName || !email || !password || !phone) {
        res.status(400);
        throw new Error('Please enter all the fields.')
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('user with this email already exists')
    }

    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

    //SENDING OTP
    const GenerateOtp = await client.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to: `+91${phone}`, channel: "sms" })

    if (GenerateOtp) {
        res.status(200).json({
            status: 'success',
            msg: 'OTP send successfully to your phone number'
        })
    } else {
        throw new Error("Something Went Wrong")
    }

})

//@desc   Verify new user with otp
//@route  POST /api/auth/users/verify
//@access public 

const verifyNewUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, password, email, phone, otp } = req.body

    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    const verifyOtp = await client.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: `+91${phone}`, code: otp })

    if (verifyOtp) {
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'avatars' })
            console.log(result)
            fs.unlinkSync(req.file.path);

            const user = await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                picturePath: result.secure_url,
                coloudinary_id: result.public_id,
                viewedProfiles: Math.floor(Math.random() * 5000),
                impressions: Math.floor(Math.random() * 5000),
            })
            if (user) {
                res.status(201).json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: generateToken(user._id),
                    message: 'otp verified successfully'
                })
            } else {
                res.status(400)
                throw new Error('Invalid user data')
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json(err);
        }


    }


})

//@desc   Auth user & get token
//@route  POST /api/auth/users/login
//@access public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        const { password, phone, ...otherData } = user._doc   //to negate password from being send
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


export { registerNewUser, verifyNewUser, authUser }