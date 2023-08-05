import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/Users.js";
import { JobModel } from "./models/Job.js";
import bodyParser from "body-parser";
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://muathkhalifa:devJobs@debjobs.f7rfo8j.mongodb.net/devJobs?retryWrites=true&w=majority"
);

// JobModel.deleteMany({})
// .then(() => {
//   console.log("All documents deleted successfully.");
// })
// .catch((err) => {
//   console.log("error", err);
// });

app.get("/hello", async (req, res) => {
  res.json("byebye");
});

app.get("/jobs", async (req, res) => {
  console.log("hereeree");

  try {
    const jobs = await JobModel.find();

    console.log("jobs: ", jobs);

    res.json(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occured while fetching jobs" });
  }
});

app.post("/register", async (req, res) => {
  // console.log("here: ", req.body);
  const { username, email, password } = req.body.userSignUpInfo;

  // console.log("username: ", username);

  try {
    const user = await UserModel.find({ username: username });
    // console.log("user: ", user[0].username);
    console.log("user: ", user);

    if (user[0] != undefined) {
      console.log("undefind clear");
    } else {
      console.log("it is undefined");
    }

    if (
      user[0] == undefined ||
      (user[0].username != username && user[0].email != email)
    ) {
      console.log("Creating new users... ");
      const createNewUser = await UserModel({
        username,
        email,
        password,
      });

      await createNewUser.save();
      res.json("new user has been created...");
    } else {
      res.json("coudn't create a new user");
    }
    // console.log("userExist: ", user.username == username);
    // res.json(user);
  } catch (error) {
    console.log("error: ", error.message);
  }
});

app.post("/list", async (req, res) => {
  const { jobTitle, type, company, location, salaryA, salaryB, remote } =
    req.body.newJob;

  console.log(req.body);

  console.log(jobTitle, type, company, location, salaryA, salaryB, remote);

  const newListing = await JobModel({
    jobTitle,
    type,
    company,
    location,
    salaryA,
    salaryB,
    remote: remote == "Remote" ? true : false,
  });

  await newListing.save();

  res.json(newListing);
});

app.listen(3001, () => console.log("server started...s"));
