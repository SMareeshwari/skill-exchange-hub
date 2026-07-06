import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function MentorDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u) { navigate('/login'); return; }
    if (u.role !== 'mentor') { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  if (!user) return null;

  const modules = [
    { icon: '👥', label: 'Batch Management',   path: '/mentor/batches',      color: '#00E5FF', desc: 'Manage your student batches' },
    { icon: '📋', label: 'Learning Contracts',  path: '/mentor/contracts',    color: '#A855F7', desc: 'Review student contracts' },
    { icon: '🕐', label: 'Office Hours',        path: '/mentor/officehours',  color: '#FFAB40', desc: 'Schedule live sessions' },
    { icon: '🛡️', label: 'Moderation',         path: '/mentor/moderation',   color: '#FF6B9D', desc: 'Review flagged content' },
    { icon: '💬', label: 'Community',           path: '/community',           color: '#00E5CC', desc: 'Answer student questions' },
    { icon: '👤', label: 'My Profile',          path: '/profile',             color: '#FFD740', desc: 'View and edit profile' },
  ];

  const users = JSON.parse(localStorage.getItem('seh_users') || '[]');
  const myStudents = users.filter(u => u.role === 'student');
  const contracts = JSON.parse(localStorage.getItem('seh_contracts') || '[]');
  const myContracts = contracts.filter(c => c.mentor === user.name);

  const stats = [
    { label: 'My Students', value: myStudents.length || 3, color: '#00E5FF', icon: '👨‍🎓' },
    { label: 'Active Contracts', value: myContracts.length || 2, color: '#A855F7', icon: '📋' },
    { label: 'Sessions Done', value: 12, color: '#FFD740', icon: '✅' },
    { label: 'Rating', value: '4.8★', color: '#00E5CC', icon: '⭐' },
  ];

  const myStudentList = [
    { name: 'Priya Sharma', skill: 'Python', progress: 65, status: 'Active' },
    { name: 'Rahul Dev', skill: 'Machine Learning', progress: 40, status: 'Active' },
    { name: 'Sneha Raj', skill: 'Python', progress: 90, status: 'Completing' },
  ];

  return (
    <div className="page-container">
      <Navbar user={user} />

      <div style={{ padding: '36px 60px' }}>

        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1033, #1A3000)',
          border: '1px solid #223399', borderRadius: '16px',
          padding: '28px 36px', marginBottom: '30px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <p style={{ color: '#6B7DB8', fontSize: '13px', marginBottom: '4px' }}>
              Mentor Dashboard
            </p>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
              Hello, {user.name} 🎓
            </h2>
            <p style={{ color: '#FFD740', fontSize: '13px' }}>
              You are shaping the future — one student at a time.
            </p>
          </div>
          <div style={{ fontSize: '64px' }}>🎓</div>
        </div>

        {/* Stats */}
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

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '30px' }}>

          {/* My Students */}
          <div className="card">
            <h3 style={{ color: '#00E5FF', marginBottom: '18px' }}>👨‍🎓 My Students</h3>
            {myStudentList.map((st, i) => (
              <div key={i} style={{
                padding: '14px', background: '#1A2870',
                borderRadius: '10px', marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{st.name}</div>
                    <div style={{ fontSize: '12px', color: '#00E5FF' }}>{st.skill}</div>
                  </div>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '12px',
                    background: st.status === 'Completing' ? '#00E5CC22' : '#00E5FF22',
                    color: st.status === 'Completing' ? '#00E5CC' : '#00E5FF',
                    border: `1px solid ${st.status === 'Completing' ? '#00E5CC' : '#00E5FF'}`
                  }}>
                    {st.status}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#0D1545', borderRadius: '3px' }}>
                    <div style={{
                      height: '100%', borderRadius: '3px', background: '#00E5FF',
                      width: `${st.progress}%`
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#00E5FF', flexShrink: 0 }}>
                    {st.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Teaching */}
          <div className="card">
            <h3 style={{ color: '#FFD740', marginBottom: '18px' }}>📤 Skills I Teach</h3>
            {(user.skillsTeach || 'Python, Machine Learning').split(',').map(s => (
              <div key={s} style={{
                background: '#1A2870', border: '1px solid #FFD74033',
                borderRadius: '8px', padding: '10px 14px',
                marginBottom: '8px', fontSize: '14px', color: '#CBD5F0'
              }}>
                ✦ {s.trim()}
              </div>
            ))}
            <div style={{ marginTop: '16px', padding: '12px', background: '#1A2870', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#6B7DB8', marginBottom: '4px' }}>
                Total Students Taught
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFD740' }}>
                {myStudents.length + 3}
              </div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <h3 style={{ fontSize: '18px', color: '#CBD5F0', marginBottom: '18px' }}>
          Mentor Modules
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {modules.map(m => (
            <div key={m.label} className="card"
              onClick={() => navigate(m.path)}
              style={{ cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = m.color;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#223399';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '12px', flexShrink: 0,
                background: m.color + '22', border: `1px solid ${m.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
              }}>
                {m.icon}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: m.color, fontSize: '14px' }}>{m.label}</div>
                <div style={{ fontSize: '12px', color: '#6B7DB8', marginTop: '3px' }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}