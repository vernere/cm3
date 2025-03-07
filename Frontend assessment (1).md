``````markdown
# Self-Assessment - Frontend
```````

## Refactoring the given example code to work with our new schema

Here is what part of the JobPage.jsx component looked like originally:

```javascript
  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Email: {job.company.contactEmail}</p>
          <p>Phone: {job.company.contactPhone}</p>
          <button onClick={() => onDeleteClick(job._id)}>delete</button>
        </>
      )}
    </div>
  );
};
```

This is what it looks like after refactoring it to work with our new schema and authentication:

```javascript
return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p><strong>Type: </strong>{job.type}</p>
          <p><strong>Description: </strong>{job.description}</p>
          <p><strong>Company: </strong>{job.company.name}</p>
          <p><strong>Email: </strong>{job.company.contactEmail}</p>
          <p><strong>Phone: </strong>{job.company.contactPhone}</p>
          <p><strong>Website: </strong>{job.company.website}</p>
          <p><strong>Employees: </strong>{job.company.size}</p>
          <p><strong>Location: </strong>{job.location}</p>
          <p><strong>Salary: </strong>{job.salary}€ per month</p>
          <p><strong>Experience level: </strong>{job.experienceLevel}</p>
          <p><strong>Posted: </strong>{job.postedDate}</p>
          <p><strong>Status: </strong>{job.status}</p>
          <p><strong>Application deadline: </strong>{job.applicationDeadline}</p>
          <p><strong>Requirements: </strong>{job.requirements}</p>

          {isAuthenticated && (
            <>
              <button onClick={() => onDeleteClick(job._id)}>delete</button>
              <button onClick={() => navigate(`/edit-job/${job._id}`)}>
                edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
```

### Key Improvements:
- **New schema:** It now uses the new schema for the job listing.
- **Visual improvements:** Added small details to make the job listing to make more sense, such as using strong to make the field stand out from the information and in "Salary:" adding € per month to the end, so it isn't just a floating number.
- **Authentication:** It now implements authentication checks before allowing a user to edit or delete a listing.
- **Edit:** Allows a user to edit the listing if authenticated.

---

## Implementing Login and Signup pages

We implemented functional login and signup pages to allow for user authentication.

### Login:

```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button disabled={isLoading}>{isLoading ? "Logging in..." : "Sign in"}</button>
      </form>
    </div>
  );
};

export default Login;
```

### Signup:
```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        password,
        phone_number: phoneNumber,
        gender,
        date_of_birth: dateOfBirth,
        membership_status: membershipStatus,
        bio,
        address,
        profile_picture: profilePicture,
      }),
    });

    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        
        <label>Gender:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
        
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        
        <label>Membership Status:</label>
        <input type="text" value={membershipStatus} onChange={(e) => setMembershipStatus(e.target.value)} required />
        
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        
        <label>Profile Picture (URL):</label>
        <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</button>
      </form>
    </div>
  );
};

export default Signup;
```

### Key Improvements:
- **Security:** This allows for a more secure way to ineract with our web application for users and the people making the job listings.
- **Functionaloty:** Meets the given requirements and runs smoothly for the desired results!

**Lessons Learned:**

1. **Consistent naming schemes:** If the variable names are inconsitent, everything will break. Making sure the naming schemes stay the same ensures that things run smoothly and can be easily updated in the future.
2. **Testing at all stages:** Making sure to test our code at all stages to make sure the changes we have made haven't broken anything.
