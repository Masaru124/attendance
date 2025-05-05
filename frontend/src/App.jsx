import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import ProfileSetup from './components/ProfileSetup.jsx'

// Placeholder components for dashboards
function TeacherDashboard() {
  return <h1>Teacher Dashboard - To be implemented</h1>;
}

function StudentDashboard() {
  return <h1>Student Dashboard - To be implemented</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
