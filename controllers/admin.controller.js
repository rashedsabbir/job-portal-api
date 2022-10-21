const {
    getAllCandidatesServices,
    getCandidateByIdServices,
    getAllHiringManagersServices,
    updateCandidateToHiringManagerServices,
  } = require("../services/admin.services");
  
  const getAllCandidates = async (req, res) => {
    try {
      const candidates = await getAllCandidatesServices();
  
      if (!candidates) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't get All Candidates",
        });
      }
  
      res.status(200).json({
        status: "success",
        candidates,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get All Candidates",
        error: error.message,
      });
    }
  };
  
  const getCandidateById = async (req, res) => {
    try {
      const { id } = req.params;
      const cadidate = await getCandidateByIdServices(id);
      if (!cadidate) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't Candidates with this id",
        });
      }
  
      res.status(200).json({
        status: "success",
        cadidate,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't Candidates with this id",
        error: error.message,
      });
    }
  };
  
  const getAllHiringManagers = async (req, res) => {
    try {
      const hiringManagers = await getAllHiringManagersServices();
  
      if (!hiringManagers) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't get All getAllHiringManagers",
        });
      }
  
      res.status(200).json({
        status: "success",
        hiringManagers,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get All getAllHiringManagers",
        error: error.message,
      });
    }
  };
  
  const updateCandidateToHiringManager = async (req, res) => {
    try {
      const { id } = req.params;
      const newManager = await updateCandidateToHiringManagerServices(id);
      if (!newManager) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't Candidates with this id",
        });
      }
  
      res.status(200).json({
        status: "success",
        newManager,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't Candidates with this id",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    getAllCandidates,
    getCandidateById,
    getAllHiringManagers,
    updateCandidateToHiringManager,
  };