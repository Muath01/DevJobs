import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/Users.js";
import { JobModel } from "./models/Job.js";
import bodyParser from "body-parser";
import { SavedJobsModel } from "./models/SavedJobs.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://muathkhalifa:devJobs@debjobs.f7rfo8j.mongodb.net/devJobs?retryWrites=true&w=majority"
);

// JobModel.deleteMany({})
//   .then(() => {
//     console.log("All documents deleted successfully.");
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });

// SavedJobsModel.deleteMany({})
//   .then(() => {
//     console.log("All documents deleted successfully.");
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });
// app.get("/hello", async (req, res) => {
//   res.json("byebye");
// });

app.get("/jobs", async (req, res) => {
  console.log("hereeree");

  try {
    const jobs = await JobModel.find();

    res.json(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occured while fetching jobs" });
  }
});

app.get("/saved", async (req, res) => {
  try {
    const user = req.query.body;

    const jobs = await SavedJobsModel.find({ user: user });

    const data = await Promise.all(
      jobs.map(async (job) => {
        const response = await JobModel.findOne(new ObjectId(job.jobID));
        return response;
      })
    );

    console.log("data: ", data);

    res.send(data);
  } catch (err) {
    console.log("error: ", err.message);
  }
});

app.post("/register", async (req, res) => {
  // console.log("here: ", req.body);
  const { username, email, password } = req.body.userSignUpInfo;

  // console.log("username: ", username);

  try {
    const user = await UserModel.find({ username: username });

    if (
      user.length == 0 &&
      user[0]?.username != username &&
      user[0]?.email != email
    ) {
      console.log("Creating new users... ");
      const createNewUser = await UserModel({
        username,
        email,
        password,
      });

      await createNewUser.save();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log("error unable to post stuff");
  }
});

app.post("/save", async (req, res) => {
  // console.log(req.body.user);
  const {
    _id: id,
    jobTitle,
    type,
    company,
    location,
    salaryA,
    salaryB,
    remote,
  } = req.body.job;

  try {
    const user = req.body.user;
    // console.log(id);

    const checkForDuplicates = await SavedJobsModel.findOne({
      jobID: id,
      user: user,
    });

    console.log("CheckForDuplicates: ", !checkForDuplicates);

    const postJobs = await SavedJobsModel({
      jobID: id,
      user: user,
    });

    if (!checkForDuplicates) {
      await postJobs.save();
    }
  } catch (err) {
    console.log("err: ", err.message);
  }

  // console.log(id, jobTitle);
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body.loginInfo;

  try {
    const user = await UserModel.find({ email: email });

    // console.log("user: ", user[0].email, "userpass: ", user[0].password);

    // console.log("emai: ", email, "password: ", password);

    if (
      user.length != 0 &&
      user[0].email == email &&
      user[0].password == password
    ) {
      console.log("Loggin in ");

      res.json({ success: true, user: user[0].username });
    } else {
      console.log("can't login");
      res.json({ success: false });
    }
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
