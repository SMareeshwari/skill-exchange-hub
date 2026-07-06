import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import SkillSearch from './pages/SkillSearch';
import Profile from './pages/Profile';
import LearningContracts from './pages/LearningContracts';
import CodeArena from './pages/CodeArena';
import WarRooms from './pages/WarRooms';
import OfficeHours from './pages/OfficeHours';
import Community from './pages/Community';
import LearningRoadmaps from './pages/LearningRoadmaps';

// Mentor Pages
import MentorDashboard from './pages/mentor/MentorDashboard';
import BatchManagement from './pages/mentor/BatchManagement';
import MentorOfficeHours from './pages/mentor/MentorOfficeHours';
import MentorContracts from './pages/mentor/MentorContracts';
import MentorModeration from './pages/mentor/MentorModeration';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageMentors from './pages/admin/ManageMentors';
import AdminModeration from './pages/admin/AdminModeration';
import PlatformAnalytics from './pages/admin/PlatformAnalytics';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/search" element={<SkillSearch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contracts" element={<LearningContracts />} />
        <Route path="/codearena" element={<CodeArena />} />
        <Route path="/warrooms" element={<WarRooms />} />
        <Route path="/officehours" element={<OfficeHours />} />
        <Route path="/community" element={<Community />} />
        <Route path="/roadmaps" element={<LearningRoadmaps />} />

        {/* Mentor */}
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/batches" element={<BatchManagement />} />
        <Route path="/mentor/officehours" element={<MentorOfficeHours />} />
        <Route path="/mentor/contracts" element={<MentorContracts />} />
        <Route path="/mentor/moderation" element={<MentorModeration />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/mentors" element={<ManageMentors />} />
        <Route path="/admin/moderation" element={<AdminModeration />} />
        <Route path="/admin/analytics" element={<PlatformAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;