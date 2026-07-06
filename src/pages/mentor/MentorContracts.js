import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function MentorContracts() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'mentor') { navigate('/login'); return; }
    setUser(u);
    const demo = [
      { id: 1, student: 'Priya Sharma', skill: 'Python Programming', sessions: 8, deadline: '2026-06-30', goals: 'Learn OOP and file handling', status: 'Active', sessionsCompleted: 5 },
      { id: 2, student: 'Rahul Dev', skill: 'Machine Learning', sessions: 10, deadline: '2026-07-15', goals: 'Build 2 ML projects', status: 'Active', sessionsCompleted: 3 },
      { id: 3, student: 'Sneha Raj', skill: 'Python Programming', sessions: 6, deadline: '2026-05-30', goals: 'Basics to intermediate', status: 'Completed', sessionsCompleted: 6 },
    ];
    setContracts(demo);
  }, [navigate]);

  const updateStatus = (id, newStatus) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const statusColor = s => s === 'Active' ? '#00E5FF' : s === 'Completed' ? '#00E5CC' : '#FF6B9D';

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
            📋 Learning <span style={{ color: '#A855F7' }}>Contracts</span>
          </h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
            Review and manage contracts with your students
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Contracts', value: contracts.length, color: '#A855F7' },
            { label: 'Active', value: contracts.filter(c => c.status === 'Active').length, color: '#00E5FF' },
            { label: 'Completed', value: contracts.filter(c => c.status === 'Completed').length, color: '#00E5CC' },
          ].map(st => (
            <div key={st.label} className="card" style={{ textAlign: 'center', borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: st.color }}>{st.value}</div>
              <div style={{ fontSize: '13px', color: '#6B7DB8', marginTop: '4px' }}>{st.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {contracts.map(c => (
            <div key={c.id} className="card"
              style={{ borderLeft: `4px solid ${statusColor(c.status)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{c.skill}</h3>
                  <p style={{ color: '#00E5FF', fontSize: '13px' }}>Student: {c.student}</p>
                </div>
                <span style={{
                  background: statusColor(c.status) + '22',
                  color: statusColor(c.status),
                  border: `1px solid ${statusColor(c.status)}`,
                  padding: '4px 14px', borderRadius: '20px', fontSize: '12px'
                }}>{c.status}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '14px' }}>
                {[
                  ['Total Sessions', c.sessions],
                  ['Completed', c.sessionsCompleted],
                  ['Deadline', c.deadline],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#1A2870', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#6B7DB8' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: '#CBD5F0', marginTop: '4px' }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#6B7DB8' }}>Session Progress</span>
                  <span style={{ fontSize: '12px', color: statusColor(c.status) }}>
                    {c.sessionsCompleted}/{c.sessions}
                  </span>
                </div>
                <div style={{ height: '6px', background: '#1A2870', borderRadius: '3px' }}>
                  <div style={{
                    height: '100%', borderRadius: '3px',
                    width: `${(c.sessionsCompleted / c.sessions) * 100}%`,
                    background: statusColor(c.status)
                  }} />
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#6B7DB8', fontStyle: 'italic', marginBottom: '14px' }}>
                Goal: {c.goals}
              </p>

              {c.status === 'Active' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-primary"
                    onClick={() => updateStatus(c.id, 'Completed')}
                    style={{ padding: '8px 20px', fontSize: '13px' }}>
                    Mark Completed
                  </button>
                  <button className="btn-outline"
                    onClick={() => updateStatus(c.id, 'On Hold')}
                    style={{ padding: '8px 20px', fontSize: '13px' }}>
                    Put On Hold
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