import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete job: ${errorText}`);
      }
      console.log("Job deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + jobId
    );
    if (!confirm) return;

    deleteJob(jobId);
  };

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
          <p><strong>Salary: </strong>{job.salary}</p>
          <p><strong>Experience level: </strong>{job.experienceLevel}</p>
          <p><strong>Posted: </strong>{job.postedDate}</p>
          <p><strong>Status: </strong>{job.status}</p>
          <p><strong>Application deadline: </strong>{job.applicationDeadline}</p>
          <p><strong>Requirements: </strong>{job.requirements}</p>

          
            <>
              <button onClick={() => onDeleteClick(job._id)}>delete</button>
              <button onClick={() => navigate(`/edit-job/${job._id}`)}>
                edit
              </button>
            </>
          
        </>
      )}
    </div>
  );
};

export default JobPage;