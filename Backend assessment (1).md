# Self-Assessment (Template)

### Example 1: Improving Code Quality

Initially, our `createJob` function was functional but lacked proper error handling and feedback to the user. Here's the original implementation:

```javascript
// Create job post
const createJob = async (req, res) => {
    const { title, type, location, description, salary, company } = req.body;

    try {
        const job = await Job.create({ title, type, location, description, salary, company });
        res.status(200).json({ job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

The function worked for creating jobs but did not provide meaningful feedback or handle validation errors effectively.

To address these issues, we refactored the code to include better error handling and validation:

```javascript
// Optimized createJob
const createJob = async (req, res) => {
    const { title, type, location, description, salary, company } = req.body;

    try {
        const job = await Job.createJobPost(title, type, location, description, salary, company);
        res.status(200).json({ job });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **Error Handling:** Added specific error messages for validation failures.
- **User Feedback:** Used `res.status(400).json` to provide meaningful feedback to the user.

---

### Example 2: Debugging Route Order in Express

We encountered an issue with routing in our `jobRouter.js` file. Here's the problematic setup:

```javascript
// Problematic route order
router.get('/:id', getJob);
router.get('/', getAllJobs);
```

Requests to `/api/jobs` returned "Invalid ID" errors because Express evaluated the dynamic `/:id` route before `/`.

### Solution:
We reordered the routes to prioritize specific routes before dynamic ones:

```javascript
// Corrected route order
router.get('/', getAllJobs);
router.get('/:id', getJob);
```

**Lessons Learned:**

1. **Route Evaluation in Express:** Routes are matched sequentially. Specific routes (e.g., `/`) must be defined before dynamic ones (e.g., `/:id`).
2. **Testing Matters:** Thorough testing revealed this subtle issue, which could have led to unpredictable behavior in production.