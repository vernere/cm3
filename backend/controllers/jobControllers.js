const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// Get all jobs
const getAllJobs = async (req, res) => {


  try {
    const jobs = await Job.find({ }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Server Error" });

  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
};

// Create a new job
const createJob = async (req, res) => {


  try {
    const user_id = req.user._id;
    const newJob = new Job({
      ...req.body,
      user_id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Server Error" });

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

// Get job by ID
const getJobById = async (req, res) => {

  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found");
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Server Error" });

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

// Update job by ID
const updateJob = async (req, res) => {

  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndUpdate(
      { _id: jobId },
      { ...req.body },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Server Error" });

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

// Delete job by ID
const deleteJob = async (req, res) => {

  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndDelete({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server Error" });
=======
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
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};