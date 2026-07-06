import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u) { navigate('/login'); return; }
    if (u.role !== 'student') { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  if (!user) return null;

  const modules = [
    { icon: '🔍', label: 'Skill Search',       path: '/search',        color: '#00E5FF', desc: 'Find mentors' },
    { icon: '🗺️', label: 'Learning Roadmaps',  path: '/roadmaps',      color: '#7C3AED', desc: 'Structured paths' },
    { icon: '📋', label: 'Learning Contracts',  path: '/contracts',     color: '#A855F7', desc: 'Your agreements' },
    { icon: '⚔️', label: 'Code Arena',          path: '/codearena',     color: '#FF6B9D', desc: 'Coding challenges' },
    { icon: '🏠', label: 'War Rooms',           path: '/warrooms',      color: '#00E5CC', desc: 'Group learning' },
    { icon: '🕐', label: 'Office Hours',        path: '/officehours',   color: '#FFAB40', desc: 'Book sessions' },
    { icon: '💬', label: 'Community',           path: '/community',     color: '#00E5FF', desc: 'Discuss & share' },
    { icon: '👤', label: 'My Profile',          path: '/profile',       color: '#FFD740', desc: 'View profile' },
  ];

  const skills = user.skillsTeach ? user.skillsTeach.split(',') : [];
  const learning = user.skillsLearn ? user.skillsLearn.split(',') : [];

  const contracts = JSON.parse(localStorage.getItem('seh_contracts') || '[]');
  const posts = JSON.parse(localStorage.getItem('seh_posts') || '[]');

  const stats = [
    { label: 'Skills Teaching', value: skills.length, color: '#00E5FF', icon: '📤' },
    { label: 'Skills Learning', value: learning.length, color: '#FFD740', icon: '📥' },
    { label: 'Contracts', value: contracts.length, color: '#A855F7', icon: '📋' },
    { label: 'Community Posts', value: posts.length, color: '#00E5CC', icon: '💬' },
  ];

  return (
    <div className="page-container">
      <Navbar user={user} />

      <div style={{ padding: '36px 60px' }}>

        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1033, #1A0050)',
          border: '1px solid #223399', borderRadius: '16px',
          padding: '28px 36px', marginBottom: '30px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <p style={{ color: '#6B7DB8', fontSize: '13px', marginBottom: '4px' }}>
              Welcome back, Student
            </p>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
              Hello, {user.name} 👋
            </h2>
            <p style={{ color: '#00E5FF', fontSize: '13px' }}>
              Keep learning — every skill you gain opens a new door.
            </p>
          </div>
          <div style={{ fontSize: '64px' }}>📚</div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: '18px', marginBottom: '30px'
        }}>
          {stats.map(st => (
            <div key={st.label} className="card"
              style={{ textAlign: 'center', borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{st.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '12px', color: '#6B7DB8', marginTop: '4px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '20px', marginBottom: '30px'
        }}>
          <div className="card">
            <h4 style={{ color: '#00E5FF', marginBottom: '12px' }}>
              📤 Skills I Can Teach
            </h4>
            {skills.length > 0
              ? skills.map(s => <span key={s} className="tag">{s.trim()}</span>)
              : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>
                  No skills added — update your profile
                </p>}
          </div>
          <div className="card">
            <h4 style={{ color: '#FFD740', marginBottom: '12px' }}>
              📥 Skills I Want to Learn
            </h4>
            {learning.length > 0
              ? learning.map(s => (
                <span key={s} className="tag"
                  style={{ borderColor: '#FFD74055', color: '#FFD740' }}>
                  {s.trim()}
                </span>
              ))
              : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>
                  No skills added — update your profile
                </p>}
          </div>
        </div>

        {/* Module Grid */}
        <h3 style={{ fontSize: '18px', color: '#CBD5F0', marginBottom: '18px' }}>
          Your Modules
        </h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px'
        }}>
          {modules.map(m => (
            <div key={m.label} className="card"
              onClick={() => navigate(m.path)}
              style={{ textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = m.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#223399';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>{m.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: m.color }}>{m.label}</div>
              <div style={{ fontSize: '11px', color: '#6B7DB8', marginTop: '4px' }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}