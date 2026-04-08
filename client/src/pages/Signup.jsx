import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("creator");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          ...form,
          role
        }
      );

      console.log("Signup Success:", res.data);

      alert("Signup successful 🚀");

      navigate("/verify-otp", { state: { email: form.email, password: form.password, role: role } });

    } catch (err) {
      console.log("Signup Error:", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="aura aura-1"></div>
      <div className="aura aura-2"></div>

      <div className="auth-content">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <h2>Join the Verse 🚀</h2>

          {/* Role Toggle */}
          <div className="role-toggle">
            <button
              className={`toggle-btn ${role === "creator" ? "active" : ""}`}
              onClick={() => setRole("creator")}
            >
              Creator
            </button>

            <button
              className={`toggle-btn ${role === "recruiter" ? "active" : ""}`}
              onClick={() => setRole("recruiter")}
            >
              Recruiter
            </button>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button className="btn primary-btn" onClick={handleSignup}>
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}