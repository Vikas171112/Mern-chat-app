import User from "../models/userModel.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
  ...crudRepository(User),

  getUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },

  getUserFriends: async (id) => {
    const friends = await User.findById(id).populate("friends", "name email");
    return friends;
  },
};
export default userRepository;
