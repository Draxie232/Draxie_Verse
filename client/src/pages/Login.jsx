import { useState } from "react";
import "../styles/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    alert("Login request sent");
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login to Draxie Verse</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn" onClick={googleLogin}>
          Sign in with Google
        </button>

      </div>

    </div>
  );
}

export default Login;