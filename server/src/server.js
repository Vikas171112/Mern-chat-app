import express from "express";
import { connectDB } from "./config/dbConfig.js";
import { MONGO_URL } from "./config/serverConfig.js";
import userRoutes from "./Routes/userRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connectDB();
});
