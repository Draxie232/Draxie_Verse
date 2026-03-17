import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Animated Aura Background */}
      <div className="aura aura-1"></div>
      <div className="aura aura-2"></div>

      <div className="home-content">
        <div className="text-section">
          <h1 className="home-logo">
            DRAXIE<br />VERSE
          </h1>
          <p className="home-tagline">
            Space for <span className="highlight">Creative Thinkers</span>.
          </p>
        </div>

        <div className="home-buttons">
          <button 
            className="btn primary-btn"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>

          <button 
            className="btn secondary-btn"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}