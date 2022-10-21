const Job = require("../models/Job");

const getAllJobsServices = async (email) => {
  return await Job.find({ "createdBy.email": email });
};

const getJobByIdServices = async (email, id) => {
  const job = await Job.findOne({ _id: id, "createdBy.email": email })
    .populate("appliedBy.id")
    .populate("appliedBy.applicationId");

  return job;
};

module.exports = { getAllJobsServices, getJobByIdServices };