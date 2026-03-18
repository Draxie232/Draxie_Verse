import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";
import VerifyOtp from "./pages/VerifyOtp";
// creator pages
import CreatorProfile from "./pages/creator/CreatorProfile";

// recruiter pages
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

function App() {
  return (
    <Router>
      <Routes>

  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/select-role" element={<SelectRole />} />

  <Route path="/creator/profile" element={<CreatorProfile />} />
  <Route path="/recruiter/profile" element={<RecruiterProfile />} />
  <Route path="/verify-otp" element={<VerifyOtp />} />

</Routes>
    </Router>
  );
}

export default App;