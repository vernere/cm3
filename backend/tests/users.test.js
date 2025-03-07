const request = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

jest.mock("../models/userModel");
jest.mock("bcryptjs");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users/signup", () => {
    it("should register a new user", async () => {
      const newUser = {
        name: "John Doe",
        username: "johndoe",
        password: "password123",
        phone_number: "1234567890",
        gender: "Male",
        date_of_birth: "2000-01-01",
        membership_status: "Active",
        bio: "I am a user",
        address: "123 Street, City",
        profile_picture: "profile.jpg",
      };

      const savedUser = { ...newUser, _id: "user123", password: "hashedpassword" };
      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue(10);
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.create.mockResolvedValue(savedUser);
  
      const res = await request(app).post("/api/users/signup").send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ username: newUser.username });
    });
  });

  describe("POST /api/users/login", () => {
    it("should log in a user", async () => {
      const user = {
        _id: "user123",
        username: "johndoe",
        password: "hashedpassword",
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);

      const res = await request(app).post("/api/users/login").send({
        username: "johndoe",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ username: "johndoe" });
    });
  });
});