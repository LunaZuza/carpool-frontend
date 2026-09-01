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

  if (loading) return <div style={{ textAlign: 'center', marginTop: 50 }}>กำลังโหลด...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>🚗 ทริปแชร์ค่ารถ</h1>
      {trips.length === 0 ? (
        <p>ยังไม่มีทริปในขณะนี้</p>
      ) : (
        trips.map((trip) => (
          <div key={trip.id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 15, borderRadius: 8 }}>
            <h3>{trip.event_name}</h3>
            <p>📍 {trip.start_location} → {trip.end_location}</p>
            <p>👤 สร้างโดย: {trip.creator_name}</p>
            <p>💺 ที่นั่งว่าง: {trip.available_seats}/{trip.total_seats}</p>
            <p>💰 {trip.cost_per_seat} บาท/คน</p>
            <button
              onClick={() => joinTrip(trip.id)}
              disabled={trip.available_seats === 0}
              style={{ padding: '8px 16px', background: trip.available_seats > 0 ? '#007bff' : '#ccc', color: 'white', border: 'none', borderRadius: 4 }}
            >
              {trip.available_seats > 0 ? 'เข้าร่วม' : 'เต็มแล้ว'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
