import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleFormSubmit,
  } = useLogin(setIsAuthenticated);

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
