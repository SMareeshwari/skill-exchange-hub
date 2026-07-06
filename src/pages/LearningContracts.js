import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LearningContracts() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    skill: '', mentor: '', sessions: '', deadline: '', goals: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('seh_contracts') || '[]');
    const demo = [
      { id: 1, skill: 'Python Programming', mentor: 'Arjun Kumar', sessions: 8, deadline: '2026-06-30', goals: 'Learn basics to advanced Python including OOP and file handling', status: 'Active' },
      { id: 2, skill: 'React JS', mentor: 'Priya Sharma', sessions: 6, deadline: '2026-07-15', goals: 'Build 3 projects using React hooks and state management', status: 'Completed' },
    ];
    setContracts([...demo, ...saved]);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = () => {
    if (!form.skill || !form.mentor || !form.sessions || !form.deadline) {
      alert('Please fill all required fields'); return;
    }
    const newContract = { ...form, id: Date.now(), status: 'Active' };
    const saved = JSON.parse(localStorage.getItem('seh_contracts') || '[]');
    saved.push(newContract);
    localStorage.setItem('seh_contracts', JSON.stringify(saved));
    setContracts(prev => [...prev, newContract]);
    setForm({ skill: '', mentor: '', sessions: '', deadline: '', goals: '' });
    setShowForm(false);
  };

  const statusColor = s => s === 'Active' ? '#00E5FF' : s === 'Completed' ? '#00E5CC' : '#FFD740';

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={{ padding: '40px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
              Learning <span style={{ color: '#A855F7' }}>Contracts</span>
            </h2>
            <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
              Formal learning agreements between mentor and learner
            </p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            + New Contract
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="card" style={{ marginBottom: '30px', borderColor: '#A855F7' }}>
            <h3 style={{ color: '#A855F7', marginBottom: '20px' }}>Create New Contract</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div>
                <label>Skill to Learn *</label>
                <input name="skill" placeholder="e.g. Python Programming" onChange={handleChange} value={form.skill} />
              </div>
              <div>
                <label>Mentor Name *</label>
                <input name="mentor" placeholder="e.g. Arjun Kumar" onChange={handleChange} value={form.mentor} />
              </div>
              <div>
                <label>Number of Sessions *</label>
                <input name="sessions" type="number" placeholder="e.g. 8" onChange={handleChange} value={form.sessions} />
              </div>
              <div>
                <label>Completion Deadline *</label>
                <input name="deadline" type="date" onChange={handleChange} value={form.deadline} />
              </div>
            </div>
            <label>Learning Goals</label>
            <textarea
              name="goals" rows={3}
              placeholder="What do you want to achieve by the end of this contract?"
              onChange={handleChange} value={form.goals}
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" onClick={handleCreate}>Create Contract</button>
              <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Contract Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {contracts.map(c => (
            <div key={c.id} className="card" style={{ borderLeft: `4px solid ${statusColor(c.status)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', color: C.white }}>{c.skill}</h3>
                <span style={{
                  background: statusColor(c.status) + '22',
                  color: statusColor(c.status),
                  border: `1px solid ${statusColor(c.status)}`,
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                }}>{c.status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                {[
                  ['🎓 Mentor', c.mentor],
                  ['📅 Sessions', c.sessions],
                  ['🗓️ Deadline', c.deadline],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#1A2870', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#6B7DB8' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: '#CBD5F0', marginTop: '4px' }}>{val}</div>
                  </div>
                ))}
              </div>
              {c.goals && (
                <p style={{ fontSize: '13px', color: '#6B7DB8', fontStyle: 'italic' }}>
                  Goal: {c.goals}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const C = { white: '#FFFFFF' };