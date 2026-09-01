import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTrip = async (tripId) => {
    try {
      await api.post(`/trips/${tripId}/join`);
      alert('เข้าร่วมทริปเรียบร้อยแล้ว');
      fetchTrips();
    } catch (err) {
      alert(err.response?.data?.error || 'เกิดข้อผิดพลาดในการเข้าร่วมทริป');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 80, color: 'var(--text-muted)' }}>กำลังโหลดทริป...</div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🚗 ทริปแชร์ค่ารถ</h1>
        <p style={{ color: 'var(--text-muted)' }}>ค้นหาและร่วมเดินทางไปยังสถานที่ต่างๆ ด้วยกัน</p>
      </div>

      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {trips.map((trip) => (
          <div key={trip.id} className="neu-card neu-card-hover" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{trip.destination}</h3>
                <span className="neu-inset" style={{ padding: '6px 12px', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
                  💰 {parseFloat(trip.price).toFixed(2)} ฿ / คน
                </span>
              </div>

              <div className="neu-inset-deep" style={{ padding: 16, marginBottom: 20 }}>
                <p style={{ fontSize: 14, marginBottom: 8, color: 'var(--text-primary)' }}>
                  📍 <strong>เส้นทาง:</strong> {trip.origin} → {trip.destination}
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  👤 ผู้สร้าง: 
                  <Link 
                    to={`/profile/${trip.driver_id || trip.user_id}`}
                    style={{ 
                      color: 'var(--accent)', 
                      fontWeight: 700, 
                      textDecoration: 'none',
                      borderBottom: '1.5px dashed var(--accent)'
                    }}
                  >
                    {trip.driver_name || trip.creator_name || trip.full_name}
                  </Link>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)' }}>
                💺 ที่นั่งว่าง: {trip.available_seats} / {trip.seats}
              </span>
              <button 
                onClick={() => handleJoinTrip(trip.id)} 
                className="neu-btn-primary" 
                style={{ padding: '8px 16px', fontSize: 14 }}
                disabled={trip.available_seats <= 0}
              >
                {trip.available_seats > 0 ? 'เข้าร่วมทริป' : 'เต็มแล้ว'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
