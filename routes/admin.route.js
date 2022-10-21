const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const auth = require("../middleware/auth");
const {
  getAllCandidates,
  getCandidateById,
  getAllHiringManagers,
  updateCandidateToHiringManager,
} = require("../controllers/admin.controller");
const router = express.Router();

router.get(
  "/candidates",
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  getAllCandidates
);

router.get(
  "/hiring-managers",
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  getAllHiringManagers
);

router.get(
  "/candidates/:id",
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  getCandidateById
);

router.patch(
  "/make-hiring-manager/:id",
  verifyToken,
  (req, res, next) => auth(req, res, next, "admin"),
  updateCandidateToHiringManager
);

module.exports = router;