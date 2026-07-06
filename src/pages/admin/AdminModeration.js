import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function AdminModeration() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([
    { id: 1, type: 'Post', user: 'Unknown', content: 'Spam promotional content about external services...', reports: 5, status: 'Pending', role: 'student' },
    { id: 2, type: 'Comment', user: 'Ravi K', content: 'Offensive language directed at another user...', reports: 3, status: 'Pending', role: 'student' },
    { id: 3, type: 'Post', user: 'Test123', content: 'Fake job offer posted to mislead students...', reports: 7, status: 'Pending', role: 'student' },
    { id: 4, type: 'Comment', user: 'Anon', content: 'Off-topic reply with unrelated links...', reports: 2, status: 'Removed', role: 'student' },
    { id: 5, type: 'Post', user: 'Mentor X', content: 'Unauthorized advertisement in community section...', reports: 4, status: 'Pending', role: 'mentor' },
  ]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  const handle = (id, action) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i));
  };

  const filtered = filter === 'All' ? items : items.filter(i => i.status === filter);

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
            🛡️ Content <span style={{ color: '#FF6B9D' }}>Moderation</span>
          </h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
            Review all reported content across students and mentors
          </p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Pending Review', value: items.filter(i => i.status === 'Pending').length, color: '#FFD740' },
            { label: 'Content Removed', value: items.filter(i => i.status === 'Removed').length, color: '#FF6B9D' },
            { label: 'Approved Safe', value: items.filter(i => i.status === 'Approved').length, color: '#00E5CC' },
          ].map(st => (
            <div key={st.label} className="card" style={{ textAlign: 'center', borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '12px', color: '#6B7DB8', marginTop: '4px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {['All', 'Pending', 'Removed', 'Approved'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? '#FF6B9D33' : 'transparent',
              border: `1px solid ${filter === f ? '#FF6B9D' : '#223399'}`,
              color: filter === f ? '#FF6B9D' : '#6B7DB8',
              padding: '6px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
            }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(item => (
            <div key={item.id} className="card" style={{
              borderLeft: `4px solid ${item.status === 'Pending' ? '#FFD740' : item.status === 'Removed' ? '#FF6B9D' : '#00E5CC'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ background: '#1A2870', color: '#CBD5F0', padding: '3px 10px', borderRadius: '6px', fontSize: '12px' }}>
                    {item.type}
                  </span>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>by {item.user}</span>
                  <span style={{
                    color: item.role === 'mentor' ? '#FFD740' : '#00E5FF',
                    fontSize: '11px', border: `1px solid ${item.role === 'mentor' ? '#FFD740' : '#00E5FF'}`,
                    padding: '2px 8px', borderRadius: '8px'
                  }}>
                    {item.role}
                  </span>
                  <span style={{ color: '#FF6B9D', fontSize: '12px' }}>
                    ⚠️ {item.reports} reports
                  </span>
                </div>
                <span style={{
                  background: item.status === 'Pending' ? '#FFD74022' : item.status === 'Removed' ? '#FF6B9D22' : '#00E5CC22',
                  color: item.status === 'Pending' ? '#FFD740' : item.status === 'Removed' ? '#FF6B9D' : '#00E5CC',
                  border: `1px solid ${item.status === 'Pending' ? '#FFD740' : item.status === 'Removed' ? '#FF6B9D' : '#00E5CC'}`,
                  padding: '3px 12px', borderRadius: '12px', fontSize: '12px'
                }}>{item.status}</span>
              </div>

              <p style={{
                fontSize: '14px', color: '#CBD5F0', marginBottom: '14px',
                background: '#1A2870', padding: '12px', borderRadius: '8px'
              }}>
                "{item.content}"
              </p>

              {item.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-primary"
                    onClick={() => handle(item.id, 'Removed')}
                    style={{ background: '#FF6B9D', padding: '8px 18px', fontSize: '13px' }}>
                    🗑 Remove Content
                  </button>
                  <button className="btn-outline"
                    onClick={() => handle(item.id, 'Approved')}
                    style={{ fontSize: '13px', padding: '8px 18px' }}>
                    ✓ Approve — No Issue
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}