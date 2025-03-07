const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const { requireAuth } = require("../middleware/customMiddleware");

const router = express.Router();

router.get("/", requireAuth, getAllJobs);
router.post("/", requireAuth, createJob);
router.get("/:jobId", requireAuth, getJobById);
router.put("/:jobId", requireAuth, updateJob);
router.delete("/:jobId", requireAuth, deleteJob);

module.exports = router;