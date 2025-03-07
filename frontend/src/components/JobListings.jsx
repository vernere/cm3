import { Link } from "react-router-dom";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-preview" key={job._id}>
          <Link to={`/jobs/${job._id}`}>
            <h2>{job.title}</h2>
          </Link>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
          <p>Location: {job.location}</p>
          <p>Salary: ${job.salary}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>Status: {job.status}</p>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
