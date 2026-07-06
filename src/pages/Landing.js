import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: '👥', title: 'Peer-to-Peer Learning', desc: 'Teach and learn from real people in your community' },
    { icon: '🔍', title: 'Skill Search', desc: 'Find mentors for any skill instantly' },
    { icon: '💬', title: 'Messaging', desc: 'Connect and communicate in real time' },
    { icon: '⚔️', title: 'Code Arena', desc: 'Compete in coding challenges' },
    { icon: '🏆', title: 'Gamification', desc: 'Earn badges and climb leaderboards' },
    { icon: '📋', title: 'Learning Contracts', desc: 'Formal commitments between mentor and learner' },
  ];

  const domains = ['Programming', 'Design', 'Communication', 'Academics', 'Music', 'Practical Skills'];

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Skill<span>Exchange</span>Hub</div>
        <div>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 40px 60px',
        background: 'linear-gradient(135deg, #0B1033 0%, #1A0050 50%, #001A3A 100%)'
      }}>
        <div style={{
          display: 'inline-block',
          background: '#00E5FF22',
          border: '1px solid #00E5FF44',
          color: '#00E5FF',
          padding: '6px 20px',
          borderRadius: '20px',
          fontSize: '13px',
          marginBottom: '24px'
        }}>
          ✦ Collaborative Learning Platform
        </div>

        <h1 style={{ fontSize: '56px', fontWeight: 'bold', lineHeight: 1.2, marginBottom: '16px' }}>
          Learn Any Skill.<br />
          <span style={{ color: '#00E5FF' }}>Teach</span> What You Know.
        </h1>

        <p style={{ fontSize: '18px', color: '#CBD5F0', maxWidth: '600px', margin: '0 auto 40px' }}>
          Skill Exchange Hub connects learners and mentors through peer-to-peer
          skill sharing — free, accessible, and community-driven.
        </p>

        <button className="btn-primary" onClick={() => navigate('/register')}
          style={{ fontSize: '16px', padding: '14px 36px', marginRight: '16px' }}>
          Get Started Free
        </button>
        <button className="btn-outline" onClick={() => navigate('/login')}
          style={{ fontSize: '16px', padding: '14px 36px' }}>
          Login
        </button>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginTop: '60px' }}>
          {[['P2P', 'Learning Model'], ['10+', 'Skill Domains'], ['3', 'User Roles']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#00E5FF' }}>{val}</div>
              <div style={{ fontSize: '13px', color: '#6B7DB8' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Domains */}
      <div style={{ padding: '50px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Supported <span style={{ color: '#00E5FF' }}>Domains</span></h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {domains.map(d => (
            <span key={d} className="tag" style={{ fontSize: '14px', padding: '8px 20px' }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '20px 60px 80px' }}>
        <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '40px' }}>
          Key <span style={{ color: '#FFD740' }}>Features</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ color: '#00E5FF', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: '#6B7DB8', fontSize: '14px' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '24px',
        borderTop: '1px solid #223399', color: '#6B7DB8', fontSize: '13px'
      }}>
        Skill Exchange HubMay 
      </div>
    </div>
  );
}