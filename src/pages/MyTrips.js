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

  if (loading) return <div style={{ textAlign: 'center', marginTop: 50 }}>กำลังโหลด...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>📋 ทริปที่ฉันสร้าง</h1>
      {trips.length === 0 ? (
        <p>คุณยังไม่ได้สร้างทริปใดๆ</p>
      ) : (
        trips.map((trip) => (
          <div key={trip.id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 15, borderRadius: 8 }}>
            <h3>{trip.event_name}</h3>
            <p>📍 {trip.start_location} → {trip.end_location}</p>
            <p>💺 ที่นั่งว่าง: {trip.available_seats}/{trip.total_seats}</p>
            <p>💰 {trip.cost_per_seat} บาท/คน</p>
            <p>สถานะ: {trip.status === 'open' ? '🟢 เปิดรับ' : '🔴 ปิดแล้ว'}</p>
            {trip.status === 'open' && (
              <button onClick={() => closeTrip(trip.id)} style={{ padding: '6px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: 4 }}>
                ปิดทริป
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyTrips;
