# Self-Assessment (Template)

### Example 1: Improving Code Quality

Initially, our `JobListings` component was functional but lacked proper error handling and feedback to the user. Here's the original implementation:

```jsx
// JobListings.jsx
import { useState, useEffect } from 'react';
import JobListing from './JobListing';

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
            const res = await fetch(apiUrl);
            const data = await res.json();
            setJobs(data);
        };

        fetchJobs();
    }, [isHome]);

    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {jobs.map((job) => (
                        <JobListing key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobListings;
```

The component worked for fetching and displaying jobs but did not handle loading states or errors effectively.

To address these issues, we refactored the code to include better error handling and loading states:

```jsx
// Optimized JobListings.jsx
import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

            try {
                const res = await fetch(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();

                if (data.length > 0) {
                    setJobs(data);
                }
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isHome]);

    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>

                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {jobs.length === 0 ? (
                            <p className='text-center text-gray-500'>No jobs available at the moment.</p>
                        ) : (
                            jobs.map((job) => (
                                <JobListing key={job.id} job={job} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobListings;
```

### Key Improvements:
- **Loading State:** Added a loading state to show a spinner while fetching data.
- **Error Handling:** Included error handling to log errors and provide feedback when no jobs are available.

---

### Example 2: Debugging Route Order in React Router

We encountered an issue with routing in our `App.jsx` file. Here's the problematic setup:

```jsx
// Problematic route order in App.jsx
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/jobs' element={<JobsPage />} />
                <Route path='/jobs/:id' element={<JobPage />} loader={jobLoader} />
                <Route path='/add-job' element={<AddJobPage />} />
                <Route path='/edit-job/:id' element={<EditJobPage />} loader={jobLoader} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
```

Requests to `/jobs/:id` were evaluated before `/add-job` and `/edit-job/:id`, causing unexpected behavior.

### Solution:
We reordered the routes to prioritize specific routes before dynamic ones:

```jsx
// Corrected route order in App.jsx
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/jobs' element={<JobsPage />} />
                <Route path='/add-job' element={<AddJobPage />} />
                <Route path='/edit-job/:id' element={<EditJobPage />} loader={jobLoader} />
                <Route path='/jobs/:id' element={<JobPage />} loader={jobLoader} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
```

**Lessons Learned:**

1. **Route Evaluation in React Router:** Routes are matched sequentially. Specific routes (e.g., `/add-job`) must be defined before dynamic ones (e.g., `/jobs/:id`).
2. **Testing Matters:** Thorough testing revealed this subtle issue, which could have led to unpredictable behavior in production.