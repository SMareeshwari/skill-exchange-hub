import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u) { navigate('/login'); return; }
    if (u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  if (!user) return null;

  const users = JSON.parse(localStorage.getItem('seh_users') || '[]');
  const students = users.filter(u => u.role === 'student');
  const mentors = users.filter(u => u.role === 'mentor');
  const contracts = JSON.parse(localStorage.getItem('seh_contracts') || '[]');
  const batches = JSON.parse(localStorage.getItem('seh_batches') || '[]');

  const stats = [
    { label: 'Total Students', value: students.length + 5, color: '#00E5FF', icon: '👨‍🎓' },
    { label: 'Total Mentors', value: mentors.length + 4, color: '#FFD740', icon: '🎓' },
    { label: 'Active Contracts', value: contracts.length + 3, color: '#A855F7', icon: '📋' },
    { label: 'Active Batches', value: batches.length + 2, color: '#00E5CC', icon: '👥' },
    { label: 'Community Posts', value: 24, color: '#FF6B9D', icon: '💬' },
    { label: 'Platform Sessions', value: 87, color: '#FFAB40', icon: '🕐' },
  ];

  const modules = [
    { icon: '👨‍🎓', label: 'Manage Students',  path: '/admin/users',      color: '#00E5FF', desc: 'View, verify, suspend students' },
    { icon: '🎓',   label: 'Manage Mentors',   path: '/admin/mentors',    color: '#FFD740', desc: 'Approve, assign, remove mentors' },
    { icon: '📊',   label: 'Analytics',         path: '/admin/analytics',  color: '#A855F7', desc: 'Platform-wide insights' },
    { icon: '🛡️',  label: 'Moderation',        path: '/admin/moderation', color: '#FF6B9D', desc: 'Review all reported content' },
  ];

  const recentActivity = [
    { action: 'New student registered', user: 'Priya Sharma', time: '2 min ago', color: '#00E5FF' },
    { action: 'Mentor approved', user: 'Arjun Kumar', time: '1 hour ago', color: '#FFD740' },
    { action: 'Contract completed', user: 'Sneha Raj', time: '3 hours ago', color: '#00E5CC' },
    { action: 'Content reported', user: 'Community Post', time: '5 hours ago', color: '#FF6B9D' },
    { action: 'New batch created', user: 'Python Batch C', time: '1 day ago', color: '#A855F7' },
  ];

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '36px 60px' }}>

        {/* Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1A0030, #0B1033)',
          border: '1px solid #223399', borderRadius: '16px',
          padding: '28px 36px', marginBottom: '30px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <p style={{ color: '#6B7DB8', fontSize: '13px', marginBottom: '4px' }}>Admin Control Panel</p>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome, {user.name} ⚙️</h2>
            <p style={{ color: '#FF6B9D', fontSize: '13px' }}>
              You have full control over the Skill Exchange Hub platform.
            </p>
          </div>
          <div style={{ fontSize: '64px' }}>⚙️</div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '14px', marginBottom: '28px' }}>
          {stats.map(st => (
            <div key={st.label} className="card"
              style={{ textAlign: 'center', borderTop: `3px solid ${st.color}`, padding: '16px' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{st.icon}</div>
              <div style={{ fontSize: '26px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '11px', color: '#6B7DB8', marginTop: '4px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>

          {/* Admin Modules */}
          <div>
            <h3 style={{ fontSize: '18px', color: '#CBD5F0', marginBottom: '16px' }}>Admin Modules</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {modules.map(m => (
                <div key={m.label} className="card"
                  onClick={() => navigate(m.path)}
                  style={{ cursor: 'pointer', display: 'flex', gap: '16px', alignItems: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#223399'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <div style={{
                    width: '46px', height: '46px', borderRadius: '10px', flexShrink: 0,
                    background: m.color + '22', border: `1px solid ${m.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
                  }}>
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: m.color, fontSize: '14px' }}>{m.label}</div>
                    <div style={{ fontSize: '12px', color: '#6B7DB8', marginTop: '2px' }}>{m.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#6B7DB8', fontSize: '18px' }}>›</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 style={{ fontSize: '18px', color: '#CBD5F0', marginBottom: '16px' }}>Recent Activity</h3>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{
                  padding: '14px 18px',
                  borderBottom: i < recentActivity.length - 1 ? '1px solid #1A2870' : 'none',
                  display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: a.color, flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#CBD5F0' }}>{a.action}</div>
                    <div style={{ fontSize: '12px', color: a.color }}>{a.user}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7DB8', flexShrink: 0 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}