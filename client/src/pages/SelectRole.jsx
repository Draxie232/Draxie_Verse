import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function SelectRole() {

  const navigate = useNavigate();

  return (
    <div className="auth-mobile">

      <h2 style={{ color: "white" }}>Choose Your Role</h2>

      <div style={{ width: "100%", maxWidth: "300px" }}>

        <button 
          className="primary-btn"
          onClick={() => navigate("/creator/profile")}
        >
          Creator
        </button>

        <button 
          className="primary-btn"
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/recruiter/profile")}
        >
          Recruiter
        </button>

      </div>

    </div>
  );
}