import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    picturePath: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    friends: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    posts: {
        type: Array,
        default: []
    },
    desc: {
        type: String
    },
    location: String,
    occupation: String,
    viewedProfiles: Number,
    impressions: Number,
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//@desc  method to hash password of a newly created user before save
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User