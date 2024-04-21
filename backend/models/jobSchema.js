import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  location: {
    type: String,
  },
  fixedSalary: {
    type: Number,
  },
  salaryFrom: {
    type: Number,
  },
  salaryTo: {
    type: Number,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);