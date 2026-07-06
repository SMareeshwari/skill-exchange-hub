import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u) { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  if (!user) return null;

  const skills = user.skillsTeach ? user.skillsTeach.split(',') : [];
  const learning = user.skillsLearn ? user.skillsLearn.split(',') : [];

  const stats = [
    { label: 'Skills Teaching', value: skills.length || 0, color: '#00E5FF' },
    { label: 'Skills Learning', value: learning.length || 0, color: '#FFD740' },
    { label: 'Sessions Done', value: 0, color: '#A855F7' },
    { label: 'Badges Earned', value: 0, color: '#00E5CC' },
  ];

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={{ padding: '40px 80px' }}>
        {/* Profile Header */}
        <div className="card" style={{
          display: 'flex', alignItems: 'center', gap: '30px',
          marginBottom: '30px', background: 'linear-gradient(135deg, #0D1545, #1A0050)'
        }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '50%',
            background: '#00E5FF', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', color: '#050714',
            flexShrink: 0
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>{user.name}</h2>
            <p style={{ color: '#00E5FF', fontSize: '14px', marginBottom: '4px' }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
            <p style={{ color: '#6B7DB8', fontSize: '13px' }}>{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {stats.map(st => (
            <div key={st.label} className="card" style={{ textAlign: 'center', borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '13px', color: '#6B7DB8', marginTop: '6px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card">
            <h3 style={{ color: '#00E5FF', marginBottom: '16px' }}>Skills I Can Teach</h3>
            {skills.length > 0
              ? skills.map(s => (
                <div key={s} style={{
                  background: '#1A2870', border: '1px solid #00E5FF33',
                  borderRadius: '8px', padding: '10px 14px', marginBottom: '8px',
                  fontSize: '14px', color: '#CBD5F0'
                }}>
                  ✦ {s.trim()}
                </div>
              ))
              : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>No skills added</p>
            }
          </div>

          <div className="card">
            <h3 style={{ color: '#FFD740', marginBottom: '16px' }}>Skills I Want to Learn</h3>
            {learning.length > 0
              ? learning.map(s => (
                <div key={s} style={{
                  background: '#1A2870', border: '1px solid #FFD74033',
                  borderRadius: '8px', padding: '10px 14px', marginBottom: '8px',
                  fontSize: '14px', color: '#CBD5F0'
                }}>
                  ◈ {s.trim()}
                </div>
              ))
              : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>No skills added</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}