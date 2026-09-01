import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreateTrip() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    event_name: '',
    event_location: '',
    start_location: '',
    end_location: '',
    total_seats: 4,
    cost_per_seat: 0,
    departure_time: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/trips', form);
      alert('สร้างทริปสำเร็จ!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>สร้างทริปใหม่</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>ชื่ออีเวนต์ *</label><br />
          <input name="event_name" value={form.event_name} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>สถานที่จัด</label><br />
          <input name="event_location" value={form.event_location} onChange={handleChange} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>ต้นทาง *</label><br />
          <input name="start_location" value={form.start_location} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>ปลายทาง *</label><br />
          <input name="end_location" value={form.end_location} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>จำนวนที่นั่ง *</label><br />
          <input type="number" name="total_seats" value={form.total_seats} onChange={handleChange} min="1" max="20" required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>ค่าใช้จ่ายต่อที่นั่ง (บาท)</label><br />
          <input type="number" name="cost_per_seat" value={form.cost_per_seat} onChange={handleChange} min="0" step="0.01" style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>เวลาออกเดินทาง</label><br />
          <input type="datetime-local" name="departure_time" value={form.departure_time} onChange={handleChange} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>รายละเอียดเพิ่มเติม</label><br />
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#28a745', color: 'white', border: 'none', borderRadius: 4 }}>
          {loading ? 'กำลังสร้าง...' : 'สร้างทริป'}
        </button>
      </form>
    </div>
  );
}

export default CreateTrip;
