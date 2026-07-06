import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'student',
    skillsTeach: '', skillsLearn: ''
  });
  const [registered, setRegistered] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert('Please fill all required fields');
      return;
    }
    // Save to localStorage (simulating a database)
    const users = JSON.parse(localStorage.getItem('seh_users') || '[]');
    const exists = users.find(u => u.email === form.email);
    if (exists) { alert('Email already registered'); return; }
    users.push({ ...form, id: Date.now() });
    localStorage.setItem('seh_users', JSON.stringify(users));
    setRegistered(true);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
        <div className="card" style={{ width: '100%', maxWidth: '480px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '28px' }}>
            Join the skill exchange community
          </p>

          {registered && (
            <div style={{
              background: '#00E5FF22', border: '1px solid #00E5FF',
              color: '#00E5FF', padding: '12px', borderRadius: '8px', marginBottom: '16px'
            }}>
              ✓ Registration successful! Redirecting to login...
            </div>
          )}

          <label>Full Name *</label>
          <input name="name" placeholder="Enter your name" onChange={handleChange} />

          <label>Email Address *</label>
          <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} />

          <label>Password *</label>
          <input name="password" type="password" placeholder="Create a password" onChange={handleChange} />

          <label>I am a</label>
          <select name="role" onChange={handleChange}>
            <option value="student">Student (I want to learn)</option>
            <option value="mentor">Mentor (I want to teach)</option>
          </select>

          <label>Skills I Can Teach</label>
          <input name="skillsTeach" placeholder="e.g. Python, Graphic Design, Guitar" onChange={handleChange} />

          <label>Skills I Want to Learn</label>
          <input name="skillsLearn" placeholder="e.g. React, Public Speaking, Music" onChange={handleChange} />

          <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', padding: '14px' }}>
            Create Account
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6B7DB8', fontSize: '14px' }}>
            Already have an account?{' '}
            <span style={{ color: '#00E5FF', cursor: 'pointer' }} onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}