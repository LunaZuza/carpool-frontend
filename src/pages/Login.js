import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (cookies.token) {
      navigate('/');
    }
  }, [cookies.token, navigate]);

  const handleGoogleLogin = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://carpool-backend-67hn.onrender.com/api';
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <div style={{
        background: 'white',
        padding: 40,
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: 400,
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 48, marginBottom: 10 }}>🚗</h1>
        <h2>Carpool</h2>
        <p style={{ color: '#666', marginBottom: 30 }}>แชร์ค่ารถไปอีเวนต์</p>

        {error && (
          <div style={{ background: '#fee', color: '#c00', padding: 10, borderRadius: 4, marginBottom: 20 }}>
            {error === 'auth_failed' && 'การเข้าสู่ระบบล้มเหลว กรุณาลองอีกครั้ง'}
            {error === 'google_auth_failed' && 'ไม่สามารถเข้าสู่ระบบด้วย Google กรุณาลองอีกครั้ง'}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '12px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.56l7.97-5.97z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.97C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          เข้าสู่ระบบด้วย Google
        </button>
      </div>
    </div>
  );
}

export default Login;
