import React, { useState, useEffect } from 'react';
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
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinTrip = async (tripId) => {
    try {
      await api.post(`/trips/${tripId}/join`, { seats: 1 });
      alert('เข้าร่วมทริปสำเร็จ!');
      fetchTrips();
    } catch (error) {
      alert(error.response?.data?.error || 'ไม่สามารถเข้าร่วมได้');
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: 100, fontSize: 18, color: 'var(--text-muted)' }}>
      กำลังโหลดข้อมูลทริป...
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🚗 ทริปแชร์ค่ารถ</h1>
        <p style={{ color: 'var(--text-muted)' }}>ค้นหาและร่วมเดินทางไปยังสถานที่ต่างๆ ด้วยกัน</p>
      </div>

      {trips.length === 0 ? (
        <div className="neu-card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          ยังไม่มีทริปในขณะนี้
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 28 }}>
          {trips.map((trip) => (
            <div key={trip.id} className="neu-card neu-card-hover" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>{trip.event_name}</h2>
                <div className="neu-inset" style={{ padding: '6px 14px', borderRadius: 999, fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
                  💰 {trip.cost_per_seat} ฿ / คน
                </div>
              </div>

              <div className="neu-inset" style={{ padding: 16, borderRadius: 18, marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>📍</span> <strong>เส้นทาง:</strong> {trip.start_location} → {trip.end_location}
                </div>
                {trip.creator_name && (
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>👤</span> <strong>ผู้สร้าง:</strong> {trip.creator_name}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)' }}>
                  💺 ที่นั่งว่าง: <span style={{ color: trip.available_seats > 0 ? 'var(--accent-secondary)' : '#E53E3E', fontSize: 16 }}>{trip.available_seats}</span> / {trip.total_seats}
                </div>
                <button
                  onClick={() => joinTrip(trip.id)}
                  disabled={trip.available_seats === 0}
                  className={trip.available_seats > 0 ? 'neu-btn-primary' : 'neu-btn'}
                  style={{ opacity: trip.available_seats > 0 ? 1 : 0.6 }}
                >
                  {trip.available_seats > 0 ? 'เข้าร่วมทริป' : 'ที่นั่งเต็มแล้ว'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
