import Message from "../models/messageModel.js";
import crudRepository from "./crudRepository.js";

const messageRepository = {
  ...crudRepository(Message),
  getmessageByConversation: async (convoId) => {
    const messages = await Message.find({ conversation: convoId })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 });
    return messages;
  },
};
export default messageRepository;
