import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('seh_current_user');
    navigate('/');
  };

  const roleColor = user?.role === 'admin' ? '#FF6B9D'
    : user?.role === 'mentor' ? '#FFD740' : '#00E5FF';

  const roleLabel = user?.role === 'admin' ? '⚙️ Admin'
    : user?.role === 'mentor' ? '🎓 Mentor' : '📚 Student';

  const homeRoute = user?.role === 'admin' ? '/admin/dashboard'
    : user?.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard';

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate(homeRoute)}
        style={{ cursor: 'pointer' }}>
        Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          background: roleColor + '22',
          border: `1px solid ${roleColor}`,
          color: roleColor, padding: '5px 14px',
          borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
        }}>
          {roleLabel}
        </div>
        <span style={{ color: '#CBD5F0', fontSize: '14px' }}>{user?.name}</span>
        <button onClick={logout} style={{
          background: 'transparent', border: '1px solid #FF6B9D',
          color: '#FF6B9D', padding: '7px 16px',
          borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
}c