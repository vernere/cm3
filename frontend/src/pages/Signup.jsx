import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
  const { formData, handleInputChange, error, isLoading, handleFormSubmit } = useSignup(setIsAuthenticated);

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        
        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required />
        
        <label>Gender:</label>
        <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} required />
        
        <label>Date of Birth:</label>
        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} required />
        
        <label>Membership Status:</label>
        <input type="text" name="membership_status" value={formData.membership_status} onChange={handleInputChange} required />
        
        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
        
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        
        <label>Profile Picture (URL):</label>
        <input type="text" name="profile_picture" value={formData.profile_picture} onChange={handleInputChange} />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</button>
      </form>
    </div>
  );
};

export default Signup;
