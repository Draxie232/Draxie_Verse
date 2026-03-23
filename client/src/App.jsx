import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";
import VerifyOtp from "./pages/VerifyOtp";

// Creator Pages & Layout
import CreatorLayout from "./layouts/CreatorLayout";
import CreatorHome from "./pages/creator/CreatorHome";
import CreatorProfile from "./pages/creator/CreatorProfile";
import Approaches from "./pages/creator/Approaches";

// Recruiter Pages
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Creator Routes (Properly Nested) */}
        <Route path="/creator" element={<CreatorLayout />}>
          {/* If they just go to /creator, send them to home */}
          <Route index element={<Navigate to="home" replace />} />
          
          {/* These pages will render INSIDE the CreatorLayout */}
          <Route path="CreatorHome" element={<CreatorHome />} />
          <Route path="Approaches" element={<Approaches />} />
          <Route path="Profile" element={<CreatorProfile />} />
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
      </Routes>
    </Router>
  );
}

export default App;