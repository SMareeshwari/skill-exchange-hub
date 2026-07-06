import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SkillSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('seh_users') || '[]');
    // Add some demo users
    const demoUsers = [
      { id: 1, name: 'Arjun Kumar', role: 'mentor', skillsTeach: 'Python, Machine Learning, Data Science', skillsLearn: 'Music' },
      { id: 2, name: 'Priya Sharma', role: 'mentor', skillsTeach: 'React, JavaScript, CSS', skillsLearn: 'Guitar' },
      { id: 3, name: 'Rahul Dev', role: 'mentor', skillsTeach: 'Guitar, Music Theory', skillsLearn: 'Python' },
      { id: 4, name: 'Sneha Raj', role: 'student', skillsTeach: 'Graphic Design, Figma', skillsLearn: 'React' },
      { id: 5, name: 'Karthik M', role: 'mentor', skillsTeach: 'Public Speaking, Communication', skillsLearn: 'Design' },
      { id: 6, name: 'Divya N', role: 'mentor', skillsTeach: 'Mathematics, Physics, Academics', skillsLearn: 'JavaScript' },
    ];
    setAllUsers([...demoUsers, ...users]);
    setResults([...demoUsers, ...users]);
  }, []);

  const handleSearch = (val) => {
    setQuery(val);
    if (!val.trim()) { setResults(allUsers); return; }
    const filtered = allUsers.filter(u =>
      u.skillsTeach && u.skillsTeach.toLowerCase().includes(val.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={{ padding: '40px 80px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
          Skill <span style={{ color: '#00E5FF' }}>Search</span>
        </h2>
        <p style={{ color: '#6B7DB8', marginBottom: '30px' }}>Find mentors who can teach you any skill</p>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '36px' }}>
          <span style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '18px'
          }}>🔍</span>
          <input
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search for a skill — e.g. Python, Guitar, Design..."
            style={{ paddingLeft: '48px', fontSize: '16px', padding: '16px 16px 16px 48px' }}
          />
        </div>

        {/* Results */}
        <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '20px' }}>
          {results.length} mentor{results.length !== 1 ? 's' : ''} found
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {results.map(u => (
            <div key={u.id} className="card"
              style={{ borderLeft: '3px solid #00E5FF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: '#1A2870', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: '#00E5FF'
                }}>
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: u.role === 'mentor' ? '#00E5FF' : '#FFD740' }}>
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', color: '#6B7DB8', marginBottom: '6px' }}>Can Teach:</div>
                {u.skillsTeach && u.skillsTeach.split(',').map(s => (
                  <span key={s} className="tag">{s.trim()}</span>
                ))}
              </div>

              <button className="btn-primary" style={{ width: '100%', marginTop: '8px', padding: '10px' }}>
                Connect
              </button>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6B7DB8' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p>No mentors found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}