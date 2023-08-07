import mongoose, { mongo } from "mongoose";

const SavedJobsSchema = mongoose.Schema({
  jobID: { type: String },
  user: { type: String },
});

export const SavedJobsModel = mongoose.model("savedJobs", SavedJobsSchema);
