import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function BatchManagement() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ batchName: '', skill: '', maxStudents: '', startDate: '' });
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'mentor') { navigate('/login'); return; }
    setUser(u);
    const saved = JSON.parse(localStorage.getItem('seh_batches') || '[]');
    const demo = [
      { id: 1, batchName: 'Python Batch A', skill: 'Python', maxStudents: 10, startDate: '2026-05-01', students: ['Priya Sharma', 'Rahul Dev', 'Sneha Raj'], status: 'Active' },
      { id: 2, batchName: 'ML Batch B', skill: 'Machine Learning', maxStudents: 8, startDate: '2026-05-15', students: ['Karthik M', 'Divya N'], status: 'Active' },
    ];
    setBatches([...demo, ...saved]);
  }, [navigate]);

  const createBatch = () => {
    if (!form.batchName || !form.skill) { alert('Fill required fields'); return; }
    const nb = { ...form, id: Date.now(), students: [], status: 'Active' };
    const saved = JSON.parse(localStorage.getItem('seh_batches') || '[]');
    saved.push(nb);
    localStorage.setItem('seh_batches', JSON.stringify(saved));
    setBatches(prev => [...prev, nb]);
    setForm({ batchName: '', skill: '', maxStudents: '', startDate: '' });
    setShowForm(false);
  };

  if (!user) return null;

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
              👥 Batch <span style={{ color: '#00E5FF' }}>Management</span>
            </h2>
            <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
              Create and manage your student learning batches
            </p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            + Create Batch
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginBottom: '28px', borderColor: '#00E5FF' }}>
            <h3 style={{ color: '#00E5FF', marginBottom: '20px' }}>New Batch</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div>
                <label>Batch Name *</label>
                <input placeholder="e.g. Python Batch A" value={form.batchName}
                  onChange={e => setForm({ ...form, batchName: e.target.value })} />
              </div>
              <div>
                <label>Skill / Subject *</label>
                <input placeholder="e.g. Python" value={form.skill}
                  onChange={e => setForm({ ...form, skill: e.target.value })} />
              </div>
              <div>
                <label>Max Students</label>
                <input type="number" placeholder="e.g. 10" value={form.maxStudents}
                  onChange={e => setForm({ ...form, maxStudents: e.target.value })} />
              </div>
              <div>
                <label>Start Date</label>
                <input type="date" value={form.startDate}
                  onChange={e => setForm({ ...form, startDate: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" onClick={createBatch}>Create</button>
              <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
          {batches.map(b => (
            <div key={b.id} className="card" style={{ borderLeft: '4px solid #00E5FF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{b.batchName}</h3>
                  <span className="tag">{b.skill}</span>
                </div>
                <span style={{
                  background: '#00E5FF22', color: '#00E5FF',
                  border: '1px solid #00E5FF', padding: '4px 12px',
                  borderRadius: '12px', fontSize: '12px', height: 'fit-content'
                }}>{b.status}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {[
                  ['📅 Start Date', b.startDate || 'Not set'],
                  ['👥 Capacity', `${b.students.length} / ${b.maxStudents || '∞'}`],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#1A2870', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#6B7DB8' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: '#CBD5F0', marginTop: '4px' }}>{val}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '12px', color: '#6B7DB8', marginBottom: '8px' }}>
                  Enrolled Students:
                </div>
                {b.students.length > 0
                  ? b.students.map(s => (
                    <span key={s} className="tag" style={{ marginBottom: '4px' }}>{s}</span>
                  ))
                  : <p style={{ color: '#6B7DB8', fontSize: '13px' }}>No students enrolled yet</p>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}