import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodeArena() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const challenges = [
    {
      id: 1, title: 'Reverse a String', difficulty: 'Easy', points: 10,
      description: 'Write a function that takes a string and returns it reversed.',
      example: 'Input: "hello"  →  Output: "olleh"',
      hint: 'Try using a loop or built-in string methods.'
    },
    {
      id: 2, title: 'Find the Largest Number', difficulty: 'Easy', points: 10,
      description: 'Given a list of numbers, find and return the largest number.',
      example: 'Input: [3, 7, 1, 9, 4]  →  Output: 9',
      hint: 'You can use max() or loop through the list.'
    },
    {
      id: 3, title: 'Check Palindrome', difficulty: 'Medium', points: 20,
      description: 'Write a function to check if a given string is a palindrome.',
      example: 'Input: "racecar"  →  Output: True',
      hint: 'Compare the string with its reverse.'
    },
    {
      id: 4, title: 'Count Vowels', difficulty: 'Easy', points: 10,
      description: 'Count the number of vowels (a, e, i, o, u) in a given string.',
      example: 'Input: "hello world"  →  Output: 3',
      hint: 'Loop through each character and check if it is a vowel.'
    },
    {
      id: 5, title: 'Fibonacci Sequence', difficulty: 'Medium', points: 20,
      description: 'Write a function that returns the first N numbers of the Fibonacci sequence.',
      example: 'Input: 6  →  Output: [0, 1, 1, 2, 3, 5]',
      hint: 'Each number is the sum of the two before it.'
    },
    {
      id: 6, title: 'Two Sum', difficulty: 'Hard', points: 30,
      description: 'Given an array of integers and a target, return indices of two numbers that add up to the target.',
      example: 'Input: [2, 7, 11, 15], target=9  →  Output: [0, 1]',
      hint: 'Use a dictionary to store seen values.'
    },
  ];

  const diffColor = d => d === 'Easy' ? '#00E5CC' : d === 'Medium' ? '#FFD740' : '#FF6B9D';

  const leaderboard = [
    { rank: 1, name: 'Arjun Kumar', points: 150, solved: 8 },
    { rank: 2, name: 'Priya Sharma', points: 120, solved: 6 },
    { rank: 3, name: 'Rahul Dev', points: 90, solved: 5 },
    { rank: 4, name: 'You', points: 30, solved: 1 },
  ];

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
          ⚔️ Code <span style={{ color: '#FF6B9D' }}>Arena</span>
        </h2>
        <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '30px' }}>
          Solve coding challenges and compete with peers
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Left: Challenges */}
          <div>
            {!selected ? (
              <>
                <h3 style={{ color: '#CBD5F0', marginBottom: '16px' }}>Available Challenges</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {challenges.map(ch => (
                    <div key={ch.id} className="card"
                      onClick={() => { setSelected(ch); setSubmitted(false); setCode(''); }}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = diffColor(ch.difficulty)}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#223399'}>
                      <div>
                        <h4 style={{ marginBottom: '6px' }}>{ch.title}</h4>
                        <p style={{ color: '#6B7DB8', fontSize: '13px' }}>{ch.description.slice(0, 60)}...</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '20px' }}>
                        <div style={{
                          color: diffColor(ch.difficulty),
                          border: `1px solid ${diffColor(ch.difficulty)}`,
                          padding: '3px 10px', borderRadius: '12px', fontSize: '12px', marginBottom: '6px'
                        }}>{ch.difficulty}</div>
                        <div style={{ color: '#FFD740', fontSize: '13px' }}>+{ch.points} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Challenge Detail */
              <div>
                <button className="btn-outline" onClick={() => setSelected(null)}
                  style={{ marginBottom: '20px' }}>← All Challenges</button>
                <div className="card" style={{ marginBottom: '20px', borderColor: diffColor(selected.difficulty) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '22px' }}>{selected.title}</h3>
                    <span style={{ color: diffColor(selected.difficulty), border: `1px solid ${diffColor(selected.difficulty)}`, padding: '4px 14px', borderRadius: '12px', fontSize: '13px' }}>
                      {selected.difficulty}
                    </span>
                  </div>
                  <p style={{ color: '#CBD5F0', marginBottom: '14px' }}>{selected.description}</p>
                  <div style={{ background: '#1A2870', padding: '12px', borderRadius: '8px', marginBottom: '14px' }}>
                    <div style={{ fontSize: '12px', color: '#6B7DB8', marginBottom: '6px' }}>Example:</div>
                    <code style={{ color: '#00E5CC', fontSize: '13px' }}>{selected.example}</code>
                  </div>
                  <div style={{ background: '#1A2870', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#6B7DB8', marginBottom: '4px' }}>💡 Hint:</div>
                    <p style={{ color: '#CBD5F0', fontSize: '13px' }}>{selected.hint}</p>
                  </div>
                </div>

                <label style={{ fontSize: '14px', color: '#CBD5F0', marginBottom: '8px', display: 'block' }}>
                  Write your solution:
                </label>
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  rows={10}
                  placeholder={`# Write your Python/JavaScript solution here\n\ndef solution():\n    pass`}
                  style={{ fontFamily: 'monospace', fontSize: '14px', resize: 'vertical', marginBottom: '16px' }}
                />

                {submitted ? (
                  <div style={{
                    background: '#00E5CC22', border: '1px solid #00E5CC',
                    color: '#00E5CC', padding: '16px', borderRadius: '8px', textAlign: 'center'
                  }}>
                    ✓ Solution submitted! You earned <strong>+{selected.points} points</strong>
                  </div>
                ) : (
                  <button className="btn-primary" onClick={() => { if (code.trim()) setSubmitted(true); else alert('Write your solution first'); }}
                    style={{ padding: '12px 32px' }}>
                    Submit Solution
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: Leaderboard */}
          <div>
            <div className="card">
              <h3 style={{ color: '#FFD740', marginBottom: '20px' }}>🏆 Leaderboard</h3>
              {leaderboard.map(l => (
                <div key={l.rank} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px', borderRadius: '8px', marginBottom: '8px',
                  background: l.name === 'You' ? '#1A2870' : 'transparent'
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: l.rank === 1 ? '#FFD740' : l.rank === 2 ? '#A0A0A0' : l.rank === 3 ? '#CD7F32' : '#223399',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 'bold',
                    color: l.rank <= 3 ? '#050714' : '#CBD5F0'
                  }}>
                    {l.rank}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: l.name === 'You' ? 'bold' : 'normal', color: l.name === 'You' ? '#00E5FF' : '#CBD5F0' }}>
                      {l.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7DB8' }}>{l.solved} solved</div>
                  </div>
                  <div style={{ color: '#FFD740', fontWeight: 'bold', fontSize: '14px' }}>
                    {l.points}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="card" style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#CBD5F0', marginBottom: '16px' }}>Your Stats</h4>
              {[
                { label: 'Challenges Solved', value: '1', color: '#00E5FF' },
                { label: 'Total Points', value: '30', color: '#FFD740' },
                { label: 'Current Rank', value: '#4', color: '#A855F7' },
              ].map(st => (
                <div key={st.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid #223399'
                }}>
                  <span style={{ color: '#6B7DB8', fontSize: '13px' }}>{st.label}</span>
                  <span style={{ color: st.color, fontWeight: 'bold' }}>{st.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}