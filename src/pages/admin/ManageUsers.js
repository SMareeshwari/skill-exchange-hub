import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function ManageUsers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);
    const saved = JSON.parse(localStorage.getItem('seh_users') || '[]');
    const demo = [
      { id: 1, name: 'Priya Sharma', email: 'priya@email.com', role: 'student', skillsLearn: 'React, Python', status: 'Active' },
      { id: 2, name: 'Rahul Dev', email: 'rahul@email.com', role: 'student', skillsLearn: 'Machine Learning', status: 'Active' },
      { id: 3, name: 'Sneha Raj', email: 'sneha@email.com', role: 'student', skillsLearn: 'React, Design', status: 'Active' },
      { id: 4, name: 'Karthik M', email: 'karthik@email.com', role: 'student', skillsLearn: 'DSA, Python', status: 'Suspended' },
      { id: 5, name: 'Divya N', email: 'divya@email.com', role: 'student', skillsLearn: 'JavaScript', status: 'Active' },
    ];
    setStudents([...demo, ...saved.filter(u => u.role === 'student')]);
  }, [navigate]);

  const toggleStatus = (id) => {
    setStudents(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s
    ));
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
              👨‍🎓 Manage <span style={{ color: '#00E5FF' }}>Students</span>
            </h2>
            <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
              View, verify, and manage all registered students
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#6B7DB8', fontSize: '13px', alignSelf: 'center' }}>
              Total: {students.length}
            </span>
          </div>
        </div>

        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: '24px', fontSize: '14px' }}
        />

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Students', value: students.length, color: '#00E5FF' },
            { label: 'Active', value: students.filter(s => s.status === 'Active').length, color: '#00E5CC' },
            { label: 'Suspended', value: students.filter(s => s.status === 'Suspended').length, color: '#FF6B9D' },
          ].map(st => (
            <div key={st.label} className="card" style={{ textAlign: 'center', borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '12px', color: '#6B7DB8', marginTop: '4px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr',
            padding: '14px 20px', background: '#1A2870',
            borderBottom: '1px solid #223399'
          }}>
            {['Name', 'Email', 'Learning', 'Status', 'Action'].map(h => (
              <div key={h} style={{ fontSize: '12px', color: '#6B7DB8', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {h}
              </div>
            ))}
          </div>

          {filtered.map((s, i) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr',
              padding: '14px 20px', alignItems: 'center',
              borderBottom: i < filtered.length - 1 ? '1px solid #1A2870' : 'none',
              background: i % 2 === 0 ? 'transparent' : '#FFFFFF08'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{s.name}</div>
              <div style={{ color: '#6B7DB8', fontSize: '13px' }}>{s.email}</div>
              <div style={{ fontSize: '12px', color: '#00E5FF' }}>{s.skillsLearn || '—'}</div>
              <div>
                <span style={{
                  background: s.status === 'Active' ? '#00E5CC22' : '#FF6B9D22',
                  color: s.status === 'Active' ? '#00E5CC' : '#FF6B9D',
                  border: `1px solid ${s.status === 'Active' ? '#00E5CC' : '#FF6B9D'}`,
                  padding: '3px 10px', borderRadius: '12px', fontSize: '11px'
                }}>
                  {s.status}
                </span>
              </div>
              <div>
                <button
                  onClick={() => toggleStatus(s.id)}
                  style={{
                    background: 'transparent', cursor: 'pointer', fontSize: '12px',
                    border: `1px solid ${s.status === 'Active' ? '#FF6B9D' : '#00E5CC'}`,
                    color: s.status === 'Active' ? '#FF6B9D' : '#00E5CC',
                    padding: '5px 12px', borderRadius: '6px'
                  }}>
                  {s.status === 'Active' ? 'Suspend' : 'Restore'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}