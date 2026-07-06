import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function MentorModeration() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([
    { id: 1, type: 'Post', user: 'Unknown User', content: 'This is spam content about unrelated products...', reported: 2, status: 'Pending' },
    { id: 2, type: 'Comment', user: 'Ravi K', content: 'Inappropriate language used in the community forum reply...', reported: 1, status: 'Pending' },
    { id: 3, type: 'Post', user: 'Test User', content: 'Off-topic promotional post about external services...', reported: 3, status: 'Pending' },
  ]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'mentor') { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  const handle = (id, action) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i));
  };

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
            🛡️ <span style={{ color: '#FF6B9D' }}>Moderation</span>
          </h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
            Review and action reported content from students
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map(item => (
            <div key={item.id} className="card"
              style={{ borderLeft: `4px solid ${item.status === 'Pending' ? '#FFD740' : item.status === 'Removed' ? '#FF6B9D' : '#00E5CC'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    background: '#1A2870', color: '#CBD5F0',
                    padding: '3px 10px', borderRadius: '6px', fontSize: '12px'
                  }}>{item.type}</span>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>by {item.user}</span>
                  <span style={{ color: '#FF6B9D', fontSize: '12px' }}>⚠️ {item.reported} report{item.reported > 1 ? 's' : ''}</span>
                </div>
                <span style={{
                  background: item.status === 'Pending' ? '#FFD74022' : item.status === 'Removed' ? '#FF6B9D22' : '#00E5CC22',
                  color: item.status === 'Pending' ? '#FFD740' : item.status === 'Removed' ? '#FF6B9D' : '#00E5CC',
                  border: `1px solid ${item.status === 'Pending' ? '#FFD740' : item.status === 'Removed' ? '#FF6B9D' : '#00E5CC'}`,
                  padding: '3px 12px', borderRadius: '12px', fontSize: '12px'
                }}>{item.status}</span>
              </div>

              <p style={{ fontSize: '14px', color: '#CBD5F0', marginBottom: '14px', background: '#1A2870', padding: '12px', borderRadius: '8px' }}>
                "{item.content}"
              </p>

              {item.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-primary"
                    onClick={() => handle(item.id, 'Removed')}
                    style={{ background: '#FF6B9D', padding: '8px 18px', fontSize: '13px' }}>
                    Remove Content
                  </button>
                  <button className="btn-outline"
                    onClick={() => handle(item.id, 'Approved')}
                    style={{ fontSize: '13px', padding: '8px 18px' }}>
                    Approve — No Issue
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