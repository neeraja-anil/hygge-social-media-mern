import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";


//@desc Create a new conversation
//@route POST /api/conversation/
//@access private


const createConversation = asyncHandler(async (req, res) => {
    const senderId = req.user._id.toString()
    const { recieverId } = req.body

    if (!senderId || !recieverId) {
        throw new Error('invalid member Ids')
    }
    const result = await Conversation.find({
        members: {
            $all: [senderId, recieverId]
        }
    })
    if (result.length !== 0) {
        res.status(200).json({
            status: 'success',
            conversation: result[0]
        })
    } else {
        const conversation = await Conversation.create({
            members: [senderId, recieverId]
        })
        res.status(201).json({
            status: 'success',
            conversation
        })
    }

})

//@desc Get conversations of user
//@route GET /api/conversation/
//@access private


const getUserConversations = asyncHandler(async (req, res) => {

    const currUser = req.user._id.toString()

    if (!currUser) {
        throw new Error('invalid senderId')
    }
    const conversation = await Conversation.find({
        members: {
            $in: [currUser]
        }
    })
    res.status(200).json(conversation)
})

//@desc Get user Chats
//@route GET /api/conversation/:friendId
//@access private


const getUserChat = asyncHandler(async (req, res) => {

    const currUser = req.user._id
    const friendId = req.params / id

    if (!currUser) {
        throw new Error('invalid senderId')
    }
    const chat = await Conversation.find({
        members: {
            $all: [currUser, friendId]
        }
    })
    res.status(200).json({
        status: 'success',
        chat
    })
})

export { createConversation, getUserConversations, getUserChat }