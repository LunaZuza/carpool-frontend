import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: '#2c3e50',
      color: 'white'
    }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🚗 Carpool</Link>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ทริปทั้งหมด</Link>
        <Link to="/my-trips" style={{ color: 'white', textDecoration: 'none' }}>ทริปของฉัน</Link>
        <Link to="/create-trip" style={{ color: 'white', textDecoration: 'none' }}>สร้างทริป</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        {user && (
          <span>
            {user.avatar_url && (
              <img src={user.avatar_url} alt={user.full_name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
            )}
            {user.full_name}
          </span>
        )}
        <button onClick={handleLogout} style={{ padding: '6px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          ออกจากระบบ
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
