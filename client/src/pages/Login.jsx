import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      console.log(res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/home");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="aura aura-1"></div>
      <div className="aura aura-2"></div>

      <div className="auth-content">
        <div className="brand-mobile">
          <h1 className="auth-logo">DRAXIE<br/>VERSE</h1>
          <p>Where creators build influence</p>
        </div>

        <motion.div className="auth-card">
          <h2>Welcome Back ✨</h2>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>

          <button className="btn primary-btn" onClick={handleLogin}>
            Log In
          </button>

          <p className="switch-text">
            New to the verse?{" "}
            <span onClick={() => navigate("/signup")}>
              Create an account
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}