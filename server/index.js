import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { UserModel } from "./models/Users.js";
import { JobModel } from "./models/Job.js";

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://muathkhalifa:devJobs@debjobs.f7rfo8j.mongodb.net/devJobs?retryWrites=true&w=majority")

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
  console.log("hereeree")

  try {
    const jobs = await JobModel.find( );

    console.log("jobs: ", jobs);

    res.json(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occured while fetching jobs" });
  }
})

app.post("/list", async (req, res) => {

    const {jobTitle, type, company, location, salaryA, salaryB, remote} = req.body.newJob;

    console.log(req.body)

    console.log(jobTitle, type, company, location, salaryA, salaryB, remote);
    
    const newListing = await JobModel({
      jobTitle, 
      type, 
      company,
      location,
      salaryA,
      salaryB,
      remote: remote == "Remote" ? true : false
    });
  
    await newListing.save();
  
    res.json(newListing);
  });

app.listen(3001, ()=> console.log("server started...s"));

