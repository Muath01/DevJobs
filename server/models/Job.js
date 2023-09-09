import mongoose, { mongo } from "mongoose";

const jobSchema = mongoose.Schema({
  jobTitle: { type: String },
  type: { type: String },
  company: { type: String },
  location: { type: String },
  remote: { type: Boolean },
  salaryA: { type: String },
  salaryB: { type: String },
});

export const JobModel = mongoose.model("jobs", jobSchema);
