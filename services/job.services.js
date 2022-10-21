const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

const getAllJobsServices = async (filters, queries) => {
  const jobs = await Job.find(filters).sort(queries.sortBy);
  return jobs;
};

const createJobServices = async (data) => {
  const createrId = data.createdBy.id;
  const job = await Job.create(data);
  await User.findOneAndUpdate(
    { _id: createrId },
    { $push: { createdJobs: job._id } }
  );
  return job;
};

const updateJobServices = async (id, data) => {
  const job = await Job.findOneAndUpdate({ _id: id }, data);
  return job;
};

const getJobByIdServices = async (id) => {
  return await Job.findById(id).populate("createdBy.id");
};

const applicationServices = async (user, data, resume, jobId) => {
  const { _id } = user;

  const jobInfo = await Job.findById(jobId);

  console.log(new Date(jobInfo.deadline));
  console.log(new Date());

  const expired = new Date() > new Date(jobInfo.deadline);
  console.log(expired);
  if (expired) {
    return "deadline over";
  }

  const alreadyApplied = await Application.findOne({
    "jobInfo.id": jobId,
    candidateId: _id,
  });

  if (alreadyApplied) {
    return "Already Applied";
  }

  const apply = await Application.create({
    ...data,
    "jobInfo.id": jobId,
    candidateId: _id,
    resume: resume,
  });

  await User.findOneAndUpdate({ _id }, { $push: { appliedJobs: apply._id } });

  const job = await Job.findOneAndUpdate(
    { _id: jobId },
    {
      $push: { appliedBy: { id: _id, applicationId: apply._id } },
    }
  );
  return apply;
};

module.exports = {
  createJobServices,
  updateJobServices,
  getAllJobsServices,
  getJobByIdServices,
  applicationServices,
};