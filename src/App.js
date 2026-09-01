import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import CreateTrip from './pages/CreateTrip';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile'; // 1. นำเข้าหน้า Profile
import api from './services/api';

function App() {
  const [cookies, , removeCookie] = useCookies(['token']);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.token) {
      api.get('/auth/me')
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          removeCookie('token', { path: '/' });
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [cookies.token, removeCookie]);

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    setUser(null);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 50 }}>กำลังโหลด...</div>;
  }

  const isAuthenticated = !!cookies.token && !!user;

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/create-trip" element={isAuthenticated ? <CreateTrip /> : <Navigate to="/login" replace />} />
        <Route path="/my-trips" element={isAuthenticated ? <MyTrips /> : <Navigate to="/login" replace />} />
        
        {/* 2. เพิ่ม Route สำหรับหน้าโปรไฟล์ผู้ใช้ */}
        <Route 
          path="/profile/:id" 
          element={isAuthenticated ? <Profile currentUser={user} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
