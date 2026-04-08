import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const password = location.state?.password; // 🔥 needed for auto login

  const handleVerify = async () => {
    try {
      // ✅ Verify OTP
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        email,
        otp
      });

      // 🔥 AUTO LOGIN AFTER VERIFY
      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      // Save token (future use)
      if (loginRes.data.token) {
        localStorage.setItem("token", loginRes.data.token);
      }

      // 🚀 REDIRECT TO HOME
      navigate("/creator/CreatorHome");

    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP 🔐</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>Verify & Continue</button>
      </div>
    </div>
  );
}