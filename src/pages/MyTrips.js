import React, { useState, useEffect } from 'react';
import api from '../services/api';

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips/my-trips');
      setTrips(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeTrip = async (tripId) => {
    if (!window.confirm('คุณต้องการปิดทริปนี้ใช่ไหม?')) return;
    try {
      await api.put(`/trips/${tripId}/close`);
      alert('ปิดทริปสำเร็จ');
      fetchTrips();
    } catch (error) {
      alert(error.response?.data?.error || 'เกิดข้อผิดพลาด');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: 100, color: 'var(--text-muted)' }}>กำลังโหลด...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 28 }}>📋 ทริปที่ฉันสร้าง</h1>
      {trips.length === 0 ? (
        <div className="neu-card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          คุณยังไม่ได้สร้างทริปใดๆ
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          {trips.map((trip) => (
            <div key={trip.id} className="neu-card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{trip.event_name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 10 }}>📍 {trip.start_location} → {trip.end_location}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
                  <span className="neu-inset" style={{ padding: '4px 12px', borderRadius: 999 }}>💺 ว่าง {trip.available_seats}/{trip.total_seats}</span>
                  <span className="neu-inset" style={{ padding: '4px 12px', borderRadius: 999 }}>💰 {trip.cost_per_seat} ฿</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 700, color: trip.status === 'open' ? 'var(--accent-secondary)' : '#E53E3E' }}>
                  {trip.status === 'open' ? '🟢 เปิดรับสมัคร' : '🔴 ปิดทริปแล้ว'}
                </span>
                {trip.status === 'open' && (
                  <button onClick={() => closeTrip(trip.id)} className="neu-btn-danger">
                    ปิดทริป
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
