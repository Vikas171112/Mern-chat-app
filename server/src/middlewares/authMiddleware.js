import userRepository from "../repositories/userRepository";
import { verifyToken } from "../utils/authUtils";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ mesage: "No Token Provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await userRepository.getById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token: User not found" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};
