import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies(['token']);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setCookie('token', token, { path: '/', maxAge: 7 * 24 * 60 * 60 });
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [searchParams, setCookie, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>กำลังเข้าสู่ระบบ...</h2>
    </div>
  );
}

export default AuthSuccess;
