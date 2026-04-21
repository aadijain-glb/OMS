import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { useState, useContext } from "react";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Successful login
      login(data.user);
      navigate("/"); // Redirect to dashboard or home

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="max-w-[400px] mx-auto p-10 border border-border rounded-md text-center">
        <div className="text-left">
          <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
        </div>
        <h1 className="text-2xl md:text-[28px] mb-2 font-medium">Login</h1>
        <p className="text-text-secondary mb-8">Welcome back.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
            {error}
          </div>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-[13px] text-text-primary underline">Forgot password?</Link>
          </div>

          <div className="mb-6">
            <button type="submit" disabled={loading} className={`btn w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <p className="text-sm text-text-secondary">
            Don't have an account? <Link to="/signup" className="underline font-medium text-text-primary">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

