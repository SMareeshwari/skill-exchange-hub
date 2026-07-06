import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function MentorOfficeHours() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ topic: '', date: '', time: '', slots: '' });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'mentor') { navigate('/login'); return; }
    setUser(u);
    setSessions([
      { id: 1, topic: 'Python Basics Q&A', date: '2026-05-18', time: '4:00 PM', slots: 5, booked: 3, status: 'Upcoming' },
      { id: 2, topic: 'Machine Learning Intro', date: '2026-05-20', time: '6:00 PM', slots: 8, booked: 8, status: 'Full' },
      { id: 3, topic: 'Python OOP Session', date: '2026-05-12', time: '5:00 PM', slots: 6, booked: 6, status: 'Completed' },
    ]);
  }, [navigate]);

  const addSession = () => {
    if (!form.topic || !form.date || !form.time) { alert('Fill required fields'); return; }
    setSessions(prev => [...prev, { ...form, id: Date.now(), booked: 0, status: 'Upcoming' }]);
    setForm({ topic: '', date: '', time: '', slots: '' });
    setShowForm(false);
  };

  const cancelSession = (id) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Cancelled' } : s));
  };

  const statusColor = s => s === 'Upcoming' ? '#00E5FF' : s === 'Full' ? '#FFD740' : s === 'Completed' ? '#00E5CC' : '#FF6B9D';

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
              🕐 Office <span style={{ color: '#FFAB40' }}>Hours</span>
            </h2>
            <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
              Schedule and manage your live student sessions
            </p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            + Schedule Session
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginBottom: '28px', borderColor: '#FFAB40' }}>
            <h3 style={{ color: '#FFAB40', marginBottom: '20px' }}>New Session</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div>
                <label>Topic *</label>
                <input placeholder="e.g. Python Basics Q&A" value={form.topic}
                  onChange={e => setForm({ ...form, topic: e.target.value })} />
              </div>
              <div>
                <label>Available Slots</label>
                <input type="number" placeholder="e.g. 8" value={form.slots}
                  onChange={e => setForm({ ...form, slots: e.target.value })} />
              </div>
              <div>
                <label>Date *</label>
                <input type="date" value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label>Time *</label>
                <input type="time" value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" onClick={addSession}>Schedule</button>
              <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {sessions.map(s => (
            <div key={s.id} className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${statusColor(s.status)}` }}>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '6px' }}>{s.topic}</h3>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>📅 {s.date}</span>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>🕐 {s.time}</span>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>
                    👥 {s.booked}/{s.slots} booked
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{
                  background: statusColor(s.status) + '22',
                  color: statusColor(s.status),
                  border: `1px solid ${statusColor(s.status)}`,
                  padding: '5px 14px', borderRadius: '12px', fontSize: '12px'
                }}>{s.status}</span>
                {s.status === 'Upcoming' && (
                  <button className="btn-outline"
                    onClick={() => cancelSession(s.id)}
                    style={{ fontSize: '12px', padding: '6px 14px', borderColor: '#FF6B9D', color: '#FF6B9D' }}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}