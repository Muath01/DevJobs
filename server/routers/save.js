import express from "express";
import { SavedJobsModel } from "../models/SavedJobs.js";
import { ObjectId } from "mongodb";

import { JobModel } from "../models/Job.js";
const router = express.Router();
router.get("/saved", async (req, res) => {
  try {
    const user = req.query.body;

    const jobs = await SavedJobsModel.find({ user: user });

    const data = await Promise.all(
      jobs.map(async (job) => {
        const response = await JobModel.findOne(new ObjectId(job.jobID));
        return response;
      })
    );

    res.send(data);
  } catch (err) {}
});

router.post("/save", async (req, res) => {
  //
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
    //

    const checkForDuplicates = await SavedJobsModel.findOne({
      jobID: id,
      user: user,
    });

    const postJobs = await SavedJobsModel({
      jobID: id,
      user: user,
    });

    if (!checkForDuplicates) {
      await postJobs.save();
    }
  } catch (err) {}

  //
});

export default router;
