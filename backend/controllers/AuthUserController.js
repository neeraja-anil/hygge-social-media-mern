import jwt from 'jsonwebtoken'
import twilio from 'twilio'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

let client, newUser


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
        friends,
        location,
        occupation,
    } = req.body

    newUser = new User({
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


    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    //SENDING OTP
    const GenerateOtp = await client.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to: `+91${phone}`, channel: "sms" })

    if (GenerateOtp) {
        res.status(200).json('OTP send successfully')
    } else {
        throw new Error("Something Went Wrong")
    }

})
//VERIFY OTP

const verifyNewUser = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    const verifyOtp = await client.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: `+91${phone}`, code: otp })

    if (verifyOtp) {

        const user = await newUser.save()
        if (user) {
            const { password, phone, ...otherData } = user._doc
            res.status(201).json({
                ...otherData,
                token: generateToken(user._id),
                message: 'otp verified successfully'
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
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