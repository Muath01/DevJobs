import { JobModel } from "../models/Job.js";
import express from "express";

const router = express.Router();

router.get("/display", async (req, res) => {
  try {
    const jobs = await JobModel.find();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching jobs" });
  }
});

router.post("/list", async (req, res) => {
  const { jobTitle, type, company, location, salaryA, salaryB, remote } =
    req.body.newJob;

  const newListing = await JobModel({
    jobTitle,
    type,
    company,
    location,
    salaryA,
    salaryB,
    remote: remote == "Remote" ? true : false,
  });

  console.log("new Listing: ", newListing);

  await newListing.save();
  console.log("new Listing Below: ", newListing);

  res.json(newListing);
});

export default router;
