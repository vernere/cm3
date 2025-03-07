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