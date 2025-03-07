const Job = require("../models/jobModel");
const mongoose = require("mongoose");

//GET / jobs;
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /jobs
const createJob = async (req, res) => {
  try {
    const { title, type, description, location, salary, experienceLevel, postedDate, status, applicationDeadline, requirements, company } = req.body;

    if (!title || !type || !description || !location || !salary) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    
    const newJob = new Job({
      title,
      type, 
      description, 
      location, 
      salary, 
      experienceLevel, 
      postedDate, 
      status, 
      applicationDeadline,
      requirements,
      company
    });
    
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /jobs/:jobId
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Check if the job ID is valid
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);

    // If the job is not found
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /jobs/:jobId
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Check if the job ID is valid
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);

    // If the job is not found
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { title, type, description, location, salary, experienceLevel, postedDate, status, applicationDeadline, requirements, company } = req.body;

    job.title = title || job.title;
    job.type = type || job.type;
    job.description = description || job.description;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.experienceLevel = experienceLevel || job.experienceLevel;
    job.postedDate = postedDate || job.postedDate;
    job.status = status || job.status;
    job.applicationDeadline = applicationDeadline || job.applicationDeadline;
    job.requirements = requirements || job.requirements;
    job.company = company || job.company;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /jobs/:jobId
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Check if the job ID is valid
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);

    // If the job is not found
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // delete the job
    await job.deleteOne();
      
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};