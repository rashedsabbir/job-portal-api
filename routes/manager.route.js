const express = require("express");
const { getAllJobs, getJobById } = require("../controllers/manager.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/jobs", verifyToken, getAllJobs);
router.get("/jobs/:id", verifyToken, getJobById);

module.exports = router;