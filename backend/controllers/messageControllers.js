import asyncHandler from "express-async-handler";
import Message from '../models/messageModel.js'
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";


//@desc add a new message
//@route POST /api/messages/
//@access private

const addMessage = asyncHandler(async (req, res) => {

    const sender = req.user._id
    const { conversationId, text } = req.body

    if (!sender) {
        throw new Error('invalid sender Id')
    }
    const message = await Message.create({
        conversationId,
        sender,
        text
    })
    res.status(200).json(message)

})

//@desc get messages
//@route POST /api/messages/:conversationId
//@access private

const getMessages = asyncHandler(async (req, res) => {

    const senderId = req.user._id
    const { conversationId } = req.params

    if (!senderId) {
        throw new Error('invalid sender Id')
    }
    const messages = await Message.find({ conversationId })
    res.status(200).json(messages)
})

//@desc clear coversation
//@route DELETE /api/messages/delete/:conversationId
//@access private

const deleteAllMessages = asyncHandler(async (req, res) => {

    const senderId = req.user._id
    const { conversationId } = req.params

    if (!senderId) {
        throw new Error('invalid sender Id')
    }
    try {
        const messages = await Message.find({ conversationId })
        for (const message of messages) {
            await message.deleteOne()
        }
        res.json({ message: 'messages cleared' })
    } catch (error) {
        console.log(error)
    }

})

export { addMessage, getMessages, deleteAllMessages }