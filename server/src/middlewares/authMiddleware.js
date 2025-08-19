import userRepository from "../repositories/userRepository.js";
import { verifyToken } from "../utils/authUtils.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // simple token header se le
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    // verify kar token
    const decoded = verifyToken(token);

    // user nikal db se
    const user = await userRepository.getById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token: User not found" });
    }
    console.log(user);
    // user attach kar request pe
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};
