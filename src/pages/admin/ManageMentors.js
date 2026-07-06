import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function ManageMentors() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);
    setMentors([
      { id: 1, name: 'Arjun Kumar', email: 'arjun@email.com', skills: 'Python, ML', students: 5, rating: 4.9, status: 'Approved', batches: 2 },
      { id: 2, name: 'Priya Mentor', email: 'priyam@email.com', skills: 'React, JavaScript', students: 3, rating: 4.7, status: 'Approved', batches: 1 },
      { id: 3, name: 'Karthik S', email: 'karthiks@email.com', skills: 'Public Speaking', students: 4, rating: 4.8, status: 'Approved', batches: 1 },
      { id: 4, name: 'New Mentor', email: 'newmentor@email.com', skills: 'Design, Figma', students: 0, rating: 0, status: 'Pending', batches: 0 },
    ]);
  }, [navigate]);

  const updateStatus = (id, status) => {
    setMentors(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const filtered = mentors.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.skills.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = s => s === 'Approved' ? '#00E5CC' : s === 'Pending' ? '#FFD740' : '#FF6B9D';

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
            🎓 Manage <span style={{ color: '#FFD740' }}>Mentors</span>
          </h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
            Approve, monitor, and manage all mentors on the platform
          </p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Mentors', value: mentors.length, color: '#FFD740' },
            { label: 'Approved', value: mentors.filter(m => m.status === 'Approved').length, color: '#00E5CC' },
            { label: 'Pending Approval', value: mentors.filter(m => m.status === 'Pending').length, color: '#FFD740' },
          ].map(st => (
            <div key={st.label} className="card" style={{ textAlign: 'center', borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '12px', color: '#6B7DB8', marginTop: '4px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        <input
          placeholder="Search by name or skill..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: '24px' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
          {filtered.map(m => (
            <div key={m.id} className="card"
              style={{ borderLeft: `4px solid ${statusColor(m.status)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: '#1A2870', border: `2px solid ${statusColor(m.status)}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', fontWeight: 'bold', color: statusColor(m.status)
                  }}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{m.name}</div>
                    <div style={{ fontSize: '12px', color: '#6B7DB8' }}>{m.email}</div>
                  </div>
                </div>
                <span style={{
                  background: statusColor(m.status) + '22',
                  color: statusColor(m.status),
                  border: `1px solid ${statusColor(m.status)}`,
                  padding: '4px 12px', borderRadius: '12px', fontSize: '12px', height: 'fit-content'
                }}>
                  {m.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '14px' }}>
                {[
                  ['🎯 Skills', m.skills],
                  ['👨‍🎓 Students', m.students],
                  ['⭐ Rating', m.rating > 0 ? `${m.rating}/5` : 'New'],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#1A2870', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#6B7DB8' }}>{label}</div>
                    <div style={{ fontSize: '13px', color: '#CBD5F0', marginTop: '3px' }}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {m.status === 'Pending' && (
                  <button className="btn-primary"
                    onClick={() => updateStatus(m.id, 'Approved')}
                    style={{ padding: '8px 18px', fontSize: '13px' }}>
                    ✓ Approve
                  </button>
                )}
                {m.status === 'Approved' && (
                  <button className="btn-outline"
                    onClick={() => updateStatus(m.id, 'Suspended')}
                    style={{ fontSize: '13px', padding: '8px 16px', borderColor: '#FF6B9D', color: '#FF6B9D' }}>
                    Suspend
                  </button>
                )}
                {m.status === 'Suspended' && (
                  <button className="btn-primary"
                    onClick={() => updateStatus(m.id, 'Approved')}
                    style={{ padding: '8px 18px', fontSize: '13px', background: '#00E5CC' }}>
                    Restore
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