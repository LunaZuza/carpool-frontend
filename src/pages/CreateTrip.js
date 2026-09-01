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
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <div className="neu-card" style={{ padding: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>
          ✨ สร้างทริปใหม่
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>ชื่ออีเวนต์ / หัวข้อทริป *</label>
            <input className="neu-input" name="event_name" value={form.event_name} onChange={handleChange} required placeholder="เช่น ไปคอนเสิร์ต Blackpink" />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>สถานที่จัดงาน</label>
            <input className="neu-input" name="event_location" value={form.event_location} onChange={handleChange} placeholder="เช่น อิมแพ็ค อารีน่า" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>จุดเริ่มต้น *</label>
              <input className="neu-input" name="start_location" value={form.start_location} onChange={handleChange} required placeholder="เช่น หมอชิต" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>ปลายทาง *</label>
              <input className="neu-input" name="end_location" value={form.end_location} onChange={handleChange} required placeholder="เช่น เมืองทองธานี" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>จำนวนที่นั่งรับ *</label>
              <input className="neu-input" type="number" name="total_seats" value={form.total_seats} onChange={handleChange} min="1" max="20" required />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>ค่าใช้จ่าย/คน (บาท)</label>
              <input className="neu-input" type="number" name="cost_per_seat" value={form.cost_per_seat} onChange={handleChange} min="0" step="0.01" />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>วันเวลาออกเดินทาง</label>
            <input className="neu-input" type="datetime-local" name="departure_time" value={form.departure_time} onChange={handleChange} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>รายละเอียดเพิ่มเติม</label>
            <textarea className="neu-input" name="description" value={form.description} onChange={handleChange} rows="3" style={{ resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={loading} className="neu-btn-primary" style={{ marginTop: 10, padding: 14, fontSize: 16 }}>
            {loading ? 'กำลังสร้างทริป...' : 'ยืนยันการสร้างทริป'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTrip;
