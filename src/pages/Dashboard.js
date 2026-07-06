import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u) { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('seh_current_user');
    navigate('/');
  };

  if (!user) return null;

 const studentModules = [
  { icon: '🔍', label: 'Skill Search',        path: '/search',    color: '#00E5FF' },
  { icon: '👤', label: 'My Profile',           path: '/profile',   color: '#FFD740' },
  { icon: '📋', label: 'Learning Contracts',   path: '/contracts', color: '#A855F7' },
  { icon: '🏠', label: 'War Rooms',            path: '/warrooms',  color: '#00E5CC' },
  { icon: '⚔️', label: 'Code Arena',           path: '/codearena', color: '#FF6B9D' },
  { icon: '🕐', label: 'Office Hours',         path: '/officehours', color: '#FFAB40' },
  { icon: '🗺️', label: 'Learning Roadmaps',    path: '#',          color: '#7C3AED' },
  { icon: '💬', label: 'Community',            path: '#',          color: '#00E5FF' },
  { icon: '🗺️', label: 'Learning Roadmaps', path: '/roadmaps',   color: '#7C3AED' },
{ icon: '💬', label: 'Community',          path: '/community',  color: '#00E5FF' },
];

  const adminModules = [
    { icon: '👥', label: 'Manage Users', path: '#', color: '#00E5FF' },
    { icon: '🛡️', label: 'Moderation', path: '#', color: '#FF6B9D' },
    { icon: '📊', label: 'Analytics', path: '#', color: '#FFD740' },
    { icon: '⚙️', label: 'Settings', path: '#', color: '#A855F7' },
  ];

  const modules = user.role === 'admin' ? adminModules : studentModules;
  const skills = user.skillsTeach ? user.skillsTeach.split(',') : [];
  const learning = user.skillsLearn ? user.skillsLearn.split(',') : [];

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo">Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#CBD5F0', fontSize: '14px' }}>
            {user.role === 'admin' ? '⚙️ Admin' : user.role === 'mentor' ? '🎓 Mentor' : '📚 Student'} — {user.name}
          </span>
          <button onClick={logout} style={{
            background: 'transparent', border: '1px solid #FF6B9D',
            color: '#FF6B9D', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
          }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '40px 60px' }}>
        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0D1545, #1A0050)',
          border: '1px solid #223399',
          borderRadius: '16px', padding: '30px', marginBottom: '36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <p style={{ color: '#6B7DB8', fontSize: '14px' }}>Welcome back,</p>
            <h2 style={{ fontSize: '30px', marginTop: '4px' }}>{user.name} 👋</h2>
            <p style={{ color: '#00E5FF', fontSize: '14px', marginTop: '8px' }}>
              Role: <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '48px' }}>
              {user.role === 'admin' ? '⚙️' : user.role === 'mentor' ? '🎓' : '📚'}
            </div>
          </div>
        </div>

        {/* Skill Tags (for students/mentors) */}
        {user.role !== 'admin' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
            <div className="card">
              <h4 style={{ color: '#00E5FF', marginBottom: '12px' }}>Skills I Can Teach</h4>
              {skills.length > 0
                ? skills.map(s => <span key={s} className="tag">{s.trim()}</span>)
                : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>No skills added yet</p>}
            </div>
            <div className="card">
              <h4 style={{ color: '#FFD740', marginBottom: '12px' }}>Skills I Want to Learn</h4>
              {learning.length > 0
                ? learning.map(s => <span key={s} className="tag" style={{ borderColor: '#FFD74055', color: '#FFD740' }}>{s.trim()}</span>)
                : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>No skills added yet</p>}
            </div>
          </div>
        )}

        {/* Module Grid */}
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#CBD5F0' }}>Platform Modules</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {modules.map(m => (
            <div key={m.label} className="card" onClick={() => navigate(m.path)}
              style={{ textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s',
                borderColor: '#223399' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = m.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#223399'}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{m.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: m.color }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}