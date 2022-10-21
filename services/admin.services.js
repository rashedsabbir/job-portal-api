const User = require("../models/User");

const getAllCandidatesServices = async () => {
  const candidates = await User.find({ role: "candidate" });
  return candidates;
};

const getAllHiringManagersServices = async () => {
  const hiringManagers = await User.find({ role: "hiring-manager" });
  return hiringManagers;
};

const getCandidateByIdServices = async (id) => {
  const candidates = await User.find({ _id: id }).populate("appliedJobs");
  return candidates;
};

const updateCandidateToHiringManagerServices = async (id) => {
  const manager = await User.findOneAndUpdate(
    { _id: id, role: "candidate" },
    { role: "hiring-manager" }
  );
  return manager;
};

module.exports = {
  getAllCandidatesServices,
  getCandidateByIdServices,
  getAllHiringManagersServices,
  updateCandidateToHiringManagerServices,
};