import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const response = await api.post("/auth/signup", {
        name,
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        navigate("/login"); // Successfully signed up, force them to login
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container section">
      <div className="max-w-[480px] mx-auto p-10 border border-border rounded-md text-center">
        <div className="text-left"><button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button></div>
        <h1 className="text-2xl md:text-[28px] mb-2 font-medium">Create Account</h1>
        <p className="text-text-secondary mb-8">Join us for exclusive access.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
            {error}
          </div>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3.5 border border-border rounded-sm text-sm outline-none focus:border-accent"
              required
              minLength="6"
            />
          </div>

          <p className="text-xs text-text-secondary mb-6 leading-relaxed text-left">
            By creating an account, you agree to our <Link to="/terms-and-policies" className="text-text-primary underline">Terms</Link> and <Link to="/privacy" className="text-text-primary underline">Privacy Policy</Link>.
          </p>

          <div className="mb-6">
            <button type="submit" disabled={loading} className={`btn w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>

          <p className="text-sm text-text-secondary">
            Already have an account? <Link to="/login" className="underline font-medium text-text-primary">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
