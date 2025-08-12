import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js"
import taskRouter from "./routes/taskRouter.js"
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected");
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch((err) => console.log(err));