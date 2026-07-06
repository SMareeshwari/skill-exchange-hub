import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function PlatformAnalytics() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u || u.role !== 'admin') { navigate('/login'); return; }
    setUser(u);
  }, [navigate]);

  if (!user) return null;

  const overallStats = [
    { label: 'Total Users', value: 127, change: '+12 this week', color: '#00E5FF' },
    { label: 'Active Sessions', value: 43, change: '+5 today', color: '#FFD740' },
    { label: 'Skills Exchanged', value: 89, change: '+8 this week', color: '#A855F7' },
    { label: 'Contracts Signed', value: 34, change: '+3 today', color: '#00E5CC' },
  ];

  const topSkills = [
    { skill: 'Python', count: 34, pct: 85 },
    { skill: 'React JS', count: 28, pct: 70 },
    { skill: 'Machine Learning', count: 22, pct: 55 },
    { skill: 'UI/UX Design', count: 18, pct: 45 },
    { skill: 'Public Speaking', count: 14, pct: 35 },
    { skill: 'DSA', count: 12, pct: 30 },
  ];

  const topMentors = [
    { name: 'Arjun Kumar', skill: 'Python', students: 12, rating: 4.9, sessions: 34 },
    { name: 'Priya Mentor', skill: 'React JS', students: 8, rating: 4.7, sessions: 22 },
    { name: 'Karthik S', skill: 'Public Speaking', students: 6, rating: 4.8, sessions: 18 },
  ];

  const userGrowth = [
    { month: 'Jan', students: 10, mentors: 3 },
    { month: 'Feb', students: 18, mentors: 5 },
    { month: 'Mar', students: 30, mentors: 8 },
    { month: 'Apr', students: 52, mentors: 12 },
    { month: 'May', students: 80, mentors: 16 },
  ];

  const maxStudents = Math.max(...userGrowth.map(g => g.students));

  return (
    <div className="page-container">
      <Navbar user={user} />
      <div style={{ padding: '40px 60px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>
            📊 Platform <span style={{ color: '#A855F7' }}>Analytics</span>
          </h2>
          <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
            Overall performance and insights across the entire platform
          </p>
        </div>

        {/* Overall Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
          {overallStats.map(st => (
            <div key={st.label} className="card" style={{ borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: st.color, marginBottom: '4px' }}>
                {st.value}
              </div>
              <div style={{ fontSize: '13px', color: '#CBD5F0', marginBottom: '6px' }}>{st.label}</div>
              <div style={{ fontSize: '12px', color: '#00E5CC' }}>↑ {st.change}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>

          {/* Top Skills */}
          <div className="card">
            <h3 style={{ color: '#CBD5F0', marginBottom: '20px' }}>🔥 Most Searched Skills</h3>
            {topSkills.map((s, i) => (
              <div key={s.skill} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: '#1A2870', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '11px', color: '#6B7DB8'
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '14px', color: '#CBD5F0' }}>{s.skill}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#00E5FF' }}>{s.count} users</span>
                </div>
                <div style={{ height: '6px', background: '#1A2870', borderRadius: '3px' }}>
                  <div style={{
                    height: '100%', borderRadius: '3px', background: '#00E5FF',
                    width: `${s.pct}%`, transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* User Growth Chart */}
          <div className="card">
            <h3 style={{ color: '#CBD5F0', marginBottom: '20px' }}>📈 User Growth</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', marginBottom: '10px' }}>
              {userGrowth.map(g => (
                <div key={g.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                  {/* Mentor bar */}
                  <div style={{
                    width: '100%', background: '#FFD740',
                    height: `${(g.mentors / maxStudents) * 140}px`,
                    borderRadius: '4px 4px 0 0', opacity: 0.8
                  }} />
                  {/* Student bar */}
                  <div style={{
                    width: '100%', background: '#00E5FF',
                    height: `${(g.students / maxStudents) * 140}px`,
                    borderRadius: '4px 4px 0 0'
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '10px' }}>
              {userGrowth.map(g => (
                <div key={g.month} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: '#6B7DB8' }}>
                  {g.month}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: '#00E5FF', borderRadius: '2px' }} />
                <span style={{ fontSize: '12px', color: '#6B7DB8' }}>Students</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: '#FFD740', borderRadius: '2px' }} />
                <span style={{ fontSize: '12px', color: '#6B7DB8' }}>Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Mentors Table */}
        <div className="card">
          <h3 style={{ color: '#CBD5F0', marginBottom: '18px' }}>🏆 Top Performing Mentors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', padding: '10px 16px', background: '#1A2870', borderRadius: '8px', marginBottom: '10px' }}>
            {['Mentor', 'Skill', 'Students', 'Rating', 'Sessions'].map(h => (
              <div key={h} style={{ fontSize: '12px', color: '#6B7DB8', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {h}
              </div>
            ))}
          </div>
          {topMentors.map((m, i) => (
            <div key={m.name} style={{
              display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
              padding: '12px 16px', alignItems: 'center',
              borderBottom: i < topMentors.length - 1 ? '1px solid #1A2870' : 'none'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: ['#FFD740', '#A0A0A0', '#CD7F32'][i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 'bold', color: '#050714'
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{m.name}</span>
              </div>
              <span className="tag">{m.skill}</span>
              <span style={{ color: '#00E5FF', fontSize: '14px' }}>{m.students}</span>
              <span style={{ color: '#FFD740', fontSize: '14px' }}>⭐ {m.rating}</span>
              <span style={{ color: '#A855F7', fontSize: '14px' }}>{m.sessions}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}