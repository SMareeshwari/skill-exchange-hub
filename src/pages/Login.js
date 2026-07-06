import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = () => {
    setError('');

    // Admin login
    if (form.email === 'admin@seh.com' && form.password === 'admin123') {
      localStorage.setItem('seh_current_user', JSON.stringify({
        name: 'Admin', role: 'admin', email: form.email, id: 'admin_001'
      }));
      navigate('/admin/dashboard');
      return;
    }

    // Demo mentor login
    if (form.email === 'mentor@seh.com' && form.password === 'mentor123') {
      localStorage.setItem('seh_current_user', JSON.stringify({
        name: 'Arjun Kumar', role: 'mentor', email: form.email,
        id: 'mentor_001', skillsTeach: 'Python, Machine Learning', skillsLearn: 'Music'
      }));
      navigate('/mentor/dashboard');
      return;
    }

    // Registered users
    const users = JSON.parse(localStorage.getItem('seh_users') || '[]');
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) { setError('Invalid email or password'); return; }

    localStorage.setItem('seh_current_user', JSON.stringify(user));

    if (user.role === 'mentor') navigate('/mentor/dashboard');
    else if (user.role === 'admin') navigate('/admin/dashboard');
    else navigate('/student/dashboard');
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '28px' }}>
            Login to your account
          </p>

          {error && (
            <div style={{
              background: '#FF6B9D22', border: '1px solid #FF6B9D',
              color: '#FF6B9D', padding: '12px', borderRadius: '8px', marginBottom: '16px'
            }}>✕ {error}</div>
          )}

          <label>Email Address</label>
          <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} />

          <label>Password</label>
          <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} />

          <button className="btn-primary" onClick={handleLogin}
            style={{ width: '100%', padding: '14px' }}>
            Login
          </button>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '20px', padding: '14px', background: '#1A2870',
            borderRadius: '8px', fontSize: '12px'
          }}>
            <div style={{ color: '#FFD740', fontWeight: 'bold', marginBottom: '8px' }}>
              Demo Credentials:
            </div>
            {[
              { role: 'Admin', email: 'admin@seh.com', pass: 'admin123', color: '#FF6B9D' },
              { role: 'Mentor', email: 'mentor@seh.com', pass: 'mentor123', color: '#00E5FF' },
              { role: 'Student', email: 'Register above', pass: '', color: '#00E5CC' },
            ].map(d => (
              <div key={d.role} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '6px 0', borderBottom: '1px solid #223399'
              }}>
                <span style={{ color: d.color, fontWeight: 'bold' }}>{d.role}</span>
                <span style={{ color: '#CBD5F0' }}>{d.email} {d.pass && `/ ${d.pass}`}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6B7DB8', fontSize: '14px' }}>
            No account?{' '}
            <span style={{ color: '#00E5FF', cursor: 'pointer' }}
              onClick={() => navigate('/register')}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
}