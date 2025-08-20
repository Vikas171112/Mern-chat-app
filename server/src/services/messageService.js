import mongoose from "mongoose";
import { conversationRepository } from "../repositories/conversationRepository.js";
import messageRepository from "../repositories/messageRepository.js";

export const sendMessageService = async ({ senderId, receiverId, text }) => {
  try {
    // convert ids to ObjectId (safe)
    const senderObjId = new mongoose.Types.ObjectId(senderId);
    const receiverObjId = new mongoose.Types.ObjectId(receiverId);

    // check if conversation already exists
    let convo = await conversationRepository.getConversationByparticipants(
      senderObjId,
      receiverObjId
    );

    // if not found, create new
    if (!convo) {
      convo = await conversationRepository.create({
        participants: [senderObjId, receiverObjId],
      });
    }

    // create message
    const message = await messageRepository.create({
      sender: senderObjId,
      receiver: receiverObjId,
      text,
      conversation: convo._id, // ✅ correct field
    });

    // update lastMessageAt
    await conversationRepository.update(convo._id, {
      lastMessageAt: Date.now(),
    });

    return message;
  } catch (error) {
    console.error("Error in sendMessageService:", error);
    throw error;
  }
};
export const getMessageServiceByconversation = async (convoId) => {
  try {
    const messages = await messageRepository.getmessageByConversation(convoId);
    return messages;
  } catch (error) {
    console.error("Error in getMessageServiceByconversation:", error);
    throw error;
  }
};
