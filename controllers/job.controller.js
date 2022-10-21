const {
    createJobServices,
    updateJobServices,
    getAllJobsServices,
    getJobByIdServices,
    applicationServices,
  } = require("../services/job.services");
  const { findUserByEmail } = require("../services/user.services");
  
  const getAllJobs = async (req, res) => {
    try {
      let filters = { ...req.query };
      const excludeFields = ["sort", "page", "limit"];
      excludeFields.forEach((field) => delete filters[field]);
  
      let filtersString = JSON.stringify(filters);
      filtersString = filtersString.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      );
  
      filters = JSON.parse(filtersString);
  
      const queries = {};
  
      if (req.query.sort) {
        // price,qunatity   -> 'price quantity'
        const sortBy = req.query.sort.split(",").join(" ");
        queries.sortBy = sortBy;
      }
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queries.fields = fields;
      }
  
      const jobs = await getAllJobsServices(filters, queries);
  
      if (!jobs) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't get jobs",
          error: error.message,
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "get all jobs",
        jobs,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get jobs",
        error: error.message,
      });
    }
  };
  
  const getJobById = async (req, res) => {
    try {
      const { id } = req.params;
      const job = await getJobByIdServices(id);
  
      if (!job) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't get job with this id",
        });
      }
  
      res.status(200).json({
        status: "success",
        job,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't get job with this id",
        error: error.message,
      });
    }
  };
  
  const createNewJob = async (req, res, next) => {
    try {
      const job = await createJobServices(req.body);
  
      if (!job) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't create job",
          error: error.message,
        });
      }
  
      res.status(201).json({
        status: "ok",
        message: "successfully created job",
        job,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't create job",
        error: error.message,
      });
    }
  };
  
  const updateJobById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const job = await updateJobServices(id, data);
      if (!job) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't get job with this id",
          error: error.message,
        });
      }
  
      res.status(201).json({
        status: "ok",
        message: "successfully updated job",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't get job with this id",
        error: error.message,
      });
    }
  };
  
  const applyJob = async (req, res) => {
    try {
      const { email } = req.user || {};
      const { id } = req.params;
      const resume = req.resumeName;
  
      const user = await findUserByEmail(email);
  
      const application = await applicationServices(user, req.body, resume, id);
  
      if (!application) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't get job with this id",
        });
      }
  
      if (application === "Already Applied") {
        return res.status(400).json({
          status: "fail",
          message: "Already Applied",
        });
      }
  
      if (application === "deadline over") {
        if (expired) {
          return res.status(401).json({
            status: "fail",
            error: "deadline over",
          });
        }
      }
  
      res.status(200).json({
        status: "success",
        application,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get job with this id",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createNewJob,
    updateJobById,
    getAllJobs,
    getJobById,
    applyJob,
  };