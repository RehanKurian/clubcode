import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Memberdashboard from './components/Memberdashboard';
import Admindashboard from './components/Admindashboard';
import Announcements from './components/Announcements';
import Profile from './components/Profile';
import Events from './components/Events';
import Club from './components/Club'; 
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Enrollment from './components/Enrollment';
import './index.css';

const App = () => {
  const role = localStorage.getItem('userRole'); 

  return (
    <Router>
      {role === 'member' && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />

        {role === 'admin' && (
          <Route path="/admindashboard" element={<Admindashboard />} />
        )}

        {role === 'member' && (
          <>
            <Route path="/memberdashboard" element={<Memberdashboard />} />
            <Route path="/events" element={<ProtectedRoutes><Events /></ProtectedRoutes>} />
            <Route path="/announcements" element={<ProtectedRoutes><Announcements /></ProtectedRoutes>} />
            <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path="/clubinfos/:clubId" element={<ProtectedRoutes><Club /></ProtectedRoutes>} /> 
            {/* Dynamic club page */}
            <Route path="/enrollment" element={<ProtectedRoutes><Enrollment /></ProtectedRoutes>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
