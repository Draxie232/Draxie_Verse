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

  const [loading, setLoading] = useState(false);

  // Cleaned up handleLogin function
  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      console.log("Login Success:", res.data);

      // 🔥 THE MAGIC LINE: Save the email so the profile page can find it!
      localStorage.setItem("userEmail", form.email);

      // Save token (if added later)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect to home/dashboard
      navigate("/creator/CreatorHome");

    } catch (err) {
      console.log("Login Error:", err.response?.data);

      const message = err.response?.data?.message;

      // 🔥 HANDLE OTP CASE
      if (message === "Please verify your email first") {
        alert("Verify your email first 🔐");

        // Redirect to OTP page with email
        navigate("/verify-otp", { state: { email: form.email } });
      } else {
        alert(message || "Login failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Background */}
      <div className="aura aura-1"></div>
      <div className="aura aura-2"></div>

      <div className="auth-content">
        {/* Branding */}
        <div className="brand-mobile">
          <h1 className="auth-logo">DRAXIE<br />VERSE</h1>
          <p>Where creators build influence</p>
        </div>

        {/* Card */}
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Welcome Back ✨</h2>

          <div className="input-group">
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
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>

          <button
            className="btn primary-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
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