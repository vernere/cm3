import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

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

  const { signup, error, loading } = useSignup();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
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
    };

    const user = await signup(userData);

    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
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
        <button disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
      </form>
    </div>
  );
};

export default Signup;
