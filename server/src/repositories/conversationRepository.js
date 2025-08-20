import Conversation from "../models/conversationModel.js";
import crudRepository from "./crudRepository.js";

export const conversationRepository = {
  ...crudRepository(Conversation),

  getConversationByparticipants: async (user1, user2) => {
    let convo = await Conversation.findOne({
      participants: { $all: [user1, user2], $size: 2 },
    });
    return convo;
  },
};
