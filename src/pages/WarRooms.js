import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WarRooms() {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Arjun Kumar', text: 'Hey everyone! Lets start with basics of React hooks', time: '10:02 AM' },
    { user: 'Priya Sharma', text: 'Sure! useState and useEffect are most important', time: '10:04 AM' },
    { user: 'Rahul Dev', text: 'Can someone explain useEffect with an example?', time: '10:06 AM' },
  ]);

  const rooms = [
    { id: 1, name: 'React JS Beginners', topic: 'React Hooks Deep Dive', members: 8, active: true, color: '#00E5FF' },
    { id: 2, name: 'Python Coders', topic: 'OOP Concepts in Python', members: 5, active: true, color: '#FFD740' },
    { id: 3, name: 'DSA Practice', topic: 'Solving Array Problems', members: 12, active: true, color: '#FF6B9D' },
    { id: 4, name: 'UI/UX Design', topic: 'Figma Prototyping', members: 4, active: false, color: '#A855F7' },
    { id: 5, name: 'Machine Learning', topic: 'Intro to Neural Networks', members: 7, active: true, color: '#00E5CC' },
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      user: 'You', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Skill<span style={{ color: '#FFD740' }}>Exchange</span>Hub
        </div>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </nav>

      <div style={{ padding: '40px 60px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
          🏠 War <span style={{ color: '#00E5CC' }}>Rooms</span>
        </h2>
        <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '30px' }}>
          Join a group learning room and collaborate with peers in real time
        </p>

        {!activeRoom ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {rooms.map(r => (
              <div key={r.id} className="card"
                style={{ borderTop: `3px solid ${r.color}`, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = r.color}
                onMouseLeave={e => e.currentTarget.style.borderTopColor = r.color}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px' }}>{r.name}</h3>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '12px',
                    background: r.active ? '#00E5CC22' : '#6B7DB822',
                    color: r.active ? '#00E5CC' : '#6B7DB8',
                    border: `1px solid ${r.active ? '#00E5CC' : '#6B7DB8'}`
                  }}>
                    {r.active ? '● Live' : '○ Offline'}
                  </span>
                </div>
                <p style={{ color: '#6B7DB8', fontSize: '13px', marginBottom: '16px' }}>
                  📌 {r.topic}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>👥 {r.members} members</span>
                  <button className="btn-primary"
                    onClick={() => setActiveRoom(r)}
                    style={{ padding: '8px 18px', fontSize: '13px' }}>
                    Join Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Inside a Room */
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '24px' }}>
            <div className="card" style={{ borderColor: activeRoom.color, padding: 0, overflow: 'hidden' }}>
              {/* Room Header */}
              <div style={{
                padding: '16px 24px', borderBottom: '1px solid #223399',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: '#1A2870'
              }}>
                <div>
                  <h3 style={{ color: activeRoom.color }}>{activeRoom.name}</h3>
                  <p style={{ color: '#6B7DB8', fontSize: '13px' }}>📌 {activeRoom.topic}</p>
                </div>
                <button className="btn-outline"
                  onClick={() => setActiveRoom(null)}
                  style={{ fontSize: '13px', padding: '8px 16px' }}>
                  Leave Room
                </button>
              </div>

              {/* Messages */}
              <div style={{ padding: '20px 24px', height: '320px', overflowY: 'auto' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '12px', marginBottom: '16px',
                    flexDirection: m.user === 'You' ? 'row-reverse' : 'row'
                  }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: m.user === 'You' ? '#00E5FF' : '#1A2870',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 'bold',
                      color: m.user === 'You' ? '#050714' : '#CBD5F0',
                      border: '1px solid #223399'
                    }}>
                      {m.user.charAt(0)}
                    </div>
                    <div style={{ maxWidth: '70%' }}>
                      <div style={{
                        fontSize: '12px', color: '#6B7DB8', marginBottom: '4px',
                        textAlign: m.user === 'You' ? 'right' : 'left'
                      }}>
                        {m.user} · {m.time}
                      </div>
                      <div style={{
                        background: m.user === 'You' ? '#00E5FF22' : '#1A2870',
                        border: `1px solid ${m.user === 'You' ? '#00E5FF44' : '#223399'}`,
                        padding: '10px 14px', borderRadius: '10px', fontSize: '14px', color: '#CBD5F0'
                      }}>
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div style={{
                padding: '16px 24px', borderTop: '1px solid #223399',
                display: 'flex', gap: '12px'
              }}>
                <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message and press Enter..."
                  style={{ margin: 0, flex: 1 }}
                />
                <button className="btn-primary" onClick={sendMessage}
                  style={{ padding: '10px 20px', flexShrink: 0 }}>
                  Send
                </button>
              </div>
            </div>

            {/* Members Panel */}
            <div className="card">
              <h4 style={{ color: '#CBD5F0', marginBottom: '16px' }}>
                👥 Members ({activeRoom.members})
              </h4>
              {['Arjun Kumar', 'Priya Sharma', 'Rahul Dev', 'Sneha Raj', 'You'].map(name => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 0', borderBottom: '1px solid #1A2870'
                }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#00E5CC', flexShrink: 0
                  }} />
                  <span style={{
                    fontSize: '13px',
                    color: name === 'You' ? '#00E5FF' : '#CBD5F0',
                    fontWeight: name === 'You' ? 'bold' : 'normal'
                  }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}