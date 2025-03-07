# Self-Assessment (Template)

### Overview

Overall the process for creating backend code was really straight forward for `userController.js`, `jobController.js` and `requireAuth` in `/middleware/customMiddleware.js`.

for `requreAuth`, We followed a familiar pattern similar to our project implementation and implementations to previous code marathons.

```javascript
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; // seperating the token from the Bearer keyword

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("username");
    console.log(req.user);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
```

As for all the controllers, we followed a basic approach. We used the `try-catch` block to handle errors and return the appropriate response to the user.

```javascript
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
```

For `signupUser` our initial code was a bit messy and 'annoying' to read and had bad practices such as the user variables being declared outside the `try-catch` block. We had to refactor the code to make it more readable and easier to understand.

Here is the initial code:
```javascript
const signupUser = async (req, res) => {
  const {
    name,
    username,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
    bio,
    address,
    profile_picture,
  } = req.body;
  try {
    if (
      !name ||
      !username ||
      !password ||
      !phone_number ||
      !gender ||
      !date_of_birth ||
      !membership_status ||
      !address ||
      !profile_picture
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
      address,
      bio,
      profile_picture,
    });

    if (user) {
      const token = GenerateToken(user._id);
      res.status(201).json({ username, token});
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

After refactoring, the code looked like this:
```javascript
const signupUser = async (req, res) => {
    try {
        const {
            name,
            username,
            password,
            phone_number,
            gender,
            date_of_birth,
            membership_status,
            bio,
            address,
            profile_picture,
        } = req.body;

        if (!name || !username || !password || !phone_number || !gender || !date_of_birth || !membership_status || !address || !profile_picture) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        // Check if user exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
            phone_number,
            gender,
            date_of_birth,
            membership_status,
            address,
            bio,
            profile_picture,
        });

        if (user) {
            const token = GenerateToken(user._id);
            res.status(201).json({ username, token});
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Challenges
Our challenges revolved mainly around git and peoples unfamiliarity with the git workflow. We had to spend a lot of time explaining how to use git and how to resolve conflicts.

**Lessons Learned:**

1. **Git Workflow:** It's essential to ensure that all team members are familiar with the git workflow to avoid conflicts and ensure smooth collaboration.
2. **Error Handling:** Proper error handling is crucial to provide meaningful feedback to users and developers.
3. **Testing:** Thorough testing helps identify issues early and ensures code quality.
4. **User input validation in the backend:** While we didn't have much in terms of input validation in the backend. we did notice how important t is important to validate user input to prevent errors and ensure data integrity in the backend.