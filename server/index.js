import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/Users.js";
import { JobModel } from "./models/Job.js";
import bodyParser from "body-parser";
import { SavedJobsModel } from "./models/SavedJobs.js";
import { ObjectId } from "mongodb";
import jobsRouter from "./routers/jobs.js";
import saveRouter from "./routers/save.js";
import authRouter from "./routers/auth.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://muathkhalifa:devJobs@debjobs.f7rfo8j.mongodb.net/devJobs?retryWrites=true&w=majority"
);

app.use("/job", jobsRouter);
app.use("/arch", saveRouter);
app.use("/auth", authRouter);
// app.use("/register", authRouter);

// JobModel.deleteMany({})
//   .then(() => {
//
//   })
//   .catch((err) => {
//
//   });

// SavedJobsModel.deleteMany({})
//   .then(() => {})
//   .catch((err) => {});
// app.get("/hello", async (req, res) => {
//   res.json("byebye");
// });

app.listen(3001, () => {
  console.log("listing...");
});
