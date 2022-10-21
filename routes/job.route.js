const express = require("express");
const {
  createNewJob,
  updateJobById,
  getAllJobs,
  getJobById,
  applyJob,
} = require("../controllers/job.controller");
const verifyToken = require("../middleware/verifyToken");
const auth = require("../middleware/auth");
const uploader = require("../middleware/uploader");
const router = express.Router();

router.get("/", verifyToken, getAllJobs);

router.post(
  "/",
  verifyToken,
  (req, res, next) => auth(req, res, next, "hiring-manager"),
  createNewJob
);

router.patch(
  "/:id",
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin", "hiring-manager"),
  updateJobById
);

router.get("/:id", verifyToken, getJobById);
router.post("/:id/apply", verifyToken, uploader.single("resume"), applyJob);

module.exports = router;