import express from "express";
import { connectDB } from "./config/dbConfig.js";
import { MONGO_URL } from "./config/serverConfig.js";
import userRoutes from "./Routes/userRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User Connected  with ", socket.id);
  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("Registered user:", userId);
  });
  socket.on("sendmessage", ({ senderId, receiverId, content }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receivemessage", { senderId, content });
    }
  });
  socket.on("disconnect", () => {
    for (let [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
      console.log("User Disconnected: ", socket.id);
    }
  });
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connectDB();
});
