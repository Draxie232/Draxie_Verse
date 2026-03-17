import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
  username: "",
  email: "",
  password: ""
});
  const [role, setRole] = useState("creator");

  return (
    <div className="auth-wrapper">
      <div className="aura aura-1"></div>
      <div className="aura aura-2"></div>

      <div className="auth-content">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2>Join the Verse 🚀</h2>

          {/* Modern Segmented Toggle */}
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
            <input type="text" placeholder="Choose a username" />
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Create a password" />
          </div>

          <button className="btn primary-btn">
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