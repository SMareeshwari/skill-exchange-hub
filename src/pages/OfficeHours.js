import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OfficeHours() {
  const navigate = useNavigate();
  const [booked, setBooked] = useState([]);

  const sessions = [
    { id: 1, mentor: 'Arjun Kumar', skill: 'Python & Data Science', date: 'Today', time: '4:00 PM – 5:00 PM', slots: 3, color: '#00E5FF' },
    { id: 2, mentor: 'Priya Sharma', skill: 'React JS & Frontend', date: 'Tomorrow', time: '6:00 PM – 7:00 PM', slots: 5, color: '#FFD740' },
    { id: 3, mentor: 'Karthik M', skill: 'Public Speaking', date: 'Wed, 18 May', time: '5:00 PM – 6:00 PM', slots: 2, color: '#A855F7' },
    { id: 4, mentor: 'Divya N', skill: 'Mathematics & Academics', date: 'Thu, 19 May', time: '3:00 PM – 4:00 PM', slots: 8, color: '#00E5CC' },
    { id: 5, mentor: 'Rahul Dev', skill: 'Guitar & Music Theory', date: 'Fri, 20 May', time: '7:00 PM – 8:00 PM', slots: 4, color: '#FF6B9D' },
  ];

  const book = (id) => {
    if (booked.includes(id)) return;
    setBooked(prev => [...prev, id]);
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={{ padding: '40px 80px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
          🕐 Office <span style={{ color: '#FFAB40' }}>Hours</span>
        </h2>
        <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '30px' }}>
          Book a live session with a mentor — ask questions, get guidance
        </p>

        {/* Booked Banner */}
        {booked.length > 0 && (
          <div style={{
            background: '#00E5CC22', border: '1px solid #00E5CC',
            color: '#00E5CC', padding: '14px 20px', borderRadius: '10px',
            marginBottom: '24px', fontSize: '14px'
          }}>
            ✓ You have booked {booked.length} session{booked.length > 1 ? 's' : ''}.
            Check your dashboard for confirmation.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sessions.map(s => (
            <div key={s.id} className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                  background: s.color + '22', border: `2px solid ${s.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 'bold', color: s.color
                }}>
                  {s.mentor.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', marginBottom: '4px' }}>{s.mentor}</h3>
                  <p style={{ color: s.color, fontSize: '13px', marginBottom: '6px' }}>{s.skill}</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#6B7DB8', fontSize: '13px' }}>📅 {s.date}</span>
                    <span style={{ color: '#6B7DB8', fontSize: '13px' }}>🕐 {s.time}</span>
                    <span style={{ color: s.slots <= 2 ? '#FF6B9D' : '#6B7DB8', fontSize: '13px' }}>
                      {s.slots <= 2 ? '⚠️' : '✓'} {s.slots} slots left
                    </span>
                  </div>
                </div>
              </div>

              {booked.includes(s.id) ? (
                <div style={{
                  background: '#00E5CC22', color: '#00E5CC',
                  border: '1px solid #00E5CC', padding: '10px 24px',
                  borderRadius: '8px', fontSize: '14px', fontWeight: 'bold'
                }}>
                  ✓ Booked
                </div>
              ) : (
                <button className="btn-primary"
                  onClick={() => book(s.id)}
                  style={{ padding: '12px 28px', flexShrink: 0 }}>
                  Book Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}