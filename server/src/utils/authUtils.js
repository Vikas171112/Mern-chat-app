import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
export function generateToken(payload) {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
}
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
