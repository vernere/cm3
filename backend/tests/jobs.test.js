const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Assuming your Express app is exported from app.js or server.js
const Job = require("../models/jobModel");
const { compare } = require("bcryptjs");

jest.mock("../models/jobModel");

describe("Job Controller", () => {
  const token = "your-token"; // Replace with a valid test token

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/jobs", () => {
    it("should return all jobs", async () => {
      const mockJobs = [{ title: "Developer" }, { title: "Designer" }];
      Job.find.mockResolvedValue(mockJobs);

      const res = await request(app)
        .get("/api/jobs")
        .set("Authorization", `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockJobs);
    });
  });

  describe("POST /api/jobs", () => {
    it("should create a new job", async () => {
      const newJob = {
        title: "Software Engineer",
        type: "Full-time",
        description: "Job description",
        location: "Remote",
        salary: 70000,
        experienceLevel: "Mid",
        company: {
          name: "Company Inc",
          contactEmail: "company@gmail.com",
          contactPhone: "123-456-7890",
        }
      };

      Job.prototype.save = jest.fn().mockResolvedValue(newJob);

      const res = await request(app)
        .post("/api/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send(newJob);
      
      expect(res.status).toBe(201);
      expect(res.body).toEqual(newJob);
    });
  });

  describe("GET /api/jobs/:jobId", () => {
    it("should return a job by ID", async () => {
      const mockJob = { _id: "605c72cfcf1b2c001f8e4c6b", title: "Tester" };
      Job.findById.mockResolvedValue(mockJob);

      const res = await request(app)
        .get(`/api/jobs/${mockJob._id}`)
        .set("Authorization", `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockJob);
    });
  });

  describe("PUT /api/jobs/:jobId", () => {
    it("should update a job", async () => {
      const mockJob = {
        title: "Software Engineer",
        type: "Full-time",
        description: "Job description",
        location: "Remote",
        salary: 70000,
        experienceLevel: "Mid",
        company: {
          name: "Company Inc",
          contactEmail: "company@gmail.com",
          contactPhone: "123-456-7890",
        },
        _id: "605c72cfcf1b2c001f8e4c6b"
      };

      const updatedJob = { title: "Updated Title" };

      Job.findById.mockResolvedValue({ ...mockJob, save: jest.fn().mockResolvedValue(updatedJob) });

      const res = await request(app)
        .put(`/api/jobs/${mockJob._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedJob);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedJob);
    });
  });

  describe("DELETE /api/jobs/:jobId", () => {
    it("should delete a job", async () => {
      const jobId = "605c72cfcf1b2c001f8e4c6b";
      Job.findById.mockResolvedValue({ deleteOne: jest.fn() });

      const res = await request(app)
        .delete(`/api/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Job deleted successfully" });
    });
  });
});