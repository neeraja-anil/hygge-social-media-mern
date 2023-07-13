import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";


//@desc Create a new conversation
//@route POST /api/conversation/
//@access private


const createConversation = asyncHandler(async (req, res) => {

    const senderId = req.user._id
    const { recieverId } = req.body

    if (!senderId || !recieverId) {
        throw new Error('invalid member Ids')
    }
    console.log('sender', senderId, 'reciever', recieverId)
    const conversation = await Conversation.create({
        members: [senderId, recieverId]
    })
    console.log(conversation)
    res.status(201).json({
        status: 'success',
        conversation
    })
})

//@desc Get conversations of user
//@route GET /api/conversation/
//@access private


const getConversation = asyncHandler(async (req, res) => {

    const currUser = req.user._id

    if (!currUser) {
        throw new Error('invalid senderId')
    }
    const conversation = await Conversation.find({
        members: {
            $in: [currUser]
        }
    })
    console.log(conversation)
    res.status(200).json({
        status: 'success',
        conversation
    })
})

export { createConversation, getConversation }