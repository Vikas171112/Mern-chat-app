import express from "express";
import { connectDB } from "./config/dbConfig.js";
import { MONGO_URL } from "./config/serverConfig.js";
import userRoutes from "./Routes/userRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connectDB();
});
