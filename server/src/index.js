import express from "express";
import cors from "cors";
// cors is a library that allows you to set up the communication rules between the frontEnd and the backEnd;
import Mongoose from "mongoose";
import { config } from "dotenv";
config();

import { userRouter } from "../routes/users.js";
import { recipesRouter } from "../routes/recipes.js";

const app = express();

app.use(express.json()); // it will convert the data that send from the frontEnd to json;
app.use(cors());


const localDB = process.env.DB;
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
};
connectDB(); 

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log("Server started")); 
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})