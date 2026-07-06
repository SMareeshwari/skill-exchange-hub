import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Community() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', tag: 'General' });
  const [activeTag, setActiveTag] = useState('All');
  const [likedPosts, setLikedPosts] = useState([]);
  const [user, setUser] = useState(null);

  const demoPosts = [
    {
      id: 1, user: 'Arjun Kumar', avatar: 'A', tag: 'Python',
      title: 'Best way to learn Python as a complete beginner?',
      body: 'I started learning Python last week. Should I focus on projects or theory first? Any roadmap suggestions would really help.',
      likes: 24, comments: [
        { user: 'Priya Sharma', text: 'Start with small projects! Build a calculator or to-do list first.' },
        { user: 'Rahul Dev', text: 'I recommend following a structured roadmap — basics, then OOP, then projects.' },
      ],
      time: '2 hours ago'
    },
    {
      id: 2, user: 'Sneha Raj', avatar: 'S', tag: 'Design',
      title: 'Figma vs Adobe XD — which one should I learn in 2026?',
      body: 'I am new to UI/UX design and confused between Figma and Adobe XD. Which one has more job opportunities and a better learning curve?',
      likes: 18, comments: [
        { user: 'Karthik M', text: 'Figma is the industry standard now. Almost every company uses it.' },
      ],
      time: '5 hours ago'
    },
    {
      id: 3, user: 'Rahul Dev', avatar: 'R', tag: 'JavaScript',
      title: 'I finally understood closures in JavaScript!',
      body: 'After struggling for weeks, I finally get closures. The key insight for me was thinking of them as functions that remember the scope they were created in. Happy to help anyone who is stuck!',
      likes: 41, comments: [
        { user: 'Arjun Kumar', text: 'Great explanation! Closures confused me too for a long time.' },
        { user: 'Divya N', text: 'Can you post an example? Would love to see your explanation.' },
      ],
      time: '1 day ago'
    },
    {
      id: 4, user: 'Karthik M', avatar: 'K', tag: 'Career',
      title: 'How to prepare for technical interviews in 30 days?',
      body: 'I have a campus interview coming up in a month. I know basic DSA but need a focused plan. Anyone who has cracked interviews recently — please share your strategy!',
      likes: 56, comments: [
        { user: 'Sneha Raj', text: 'Focus on arrays, strings, and trees first. Then practice on LeetCode easy and medium.' },
        { user: 'Rahul Dev', text: 'Mock interviews helped me a lot. Try to simulate real interview conditions.' },
      ],
      time: '2 days ago'
    },
    {
      id: 5, user: 'Divya N', avatar: 'D', tag: 'Academics',
      title: 'Sharing my notes on Data Structures — free for everyone!',
      body: 'I compiled my entire DSA notes including arrays, linked lists, trees, graphs, and dynamic programming with examples. Feel free to use them. This is what Skill Exchange Hub is about — sharing knowledge freely.',
      likes: 89, comments: [
        { user: 'Arjun Kumar', text: 'This is amazing! Thank you so much Divya.' },
        { user: 'Karthik M', text: 'Exactly the spirit of this platform. Sharing is learning!' },
      ],
      time: '3 days ago'
    },
  ];

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('seh_current_user'));
    if (!u) { navigate('/login'); return; }
    setUser(u);
    const saved = JSON.parse(localStorage.getItem('seh_posts') || '[]');
    setPosts([...demoPosts, ...saved]);
  }, []);

  const tags = ['All', 'Python', 'JavaScript', 'Design', 'Career', 'Academics', 'General'];
  const tagColors = {
    Python: '#00E5FF', JavaScript: '#FFD740', Design: '#A855F7',
    Career: '#FF6B9D', Academics: '#00E5CC', General: '#6B7DB8', All: '#CBD5F0'
  };

  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag);

  const handlePost = () => {
    if (!form.title || !form.body) { alert('Please fill title and description'); return; }
    const newPost = {
      id: Date.now(),
      user: user.name, avatar: user.name.charAt(0),
      tag: form.tag, title: form.title, body: form.body,
      likes: 0, comments: [], time: 'Just now'
    };
    const saved = JSON.parse(localStorage.getItem('seh_posts') || '[]');
    saved.push(newPost);
    localStorage.setItem('seh_posts', JSON.stringify(saved));
    setPosts(prev => [newPost, ...prev]);
    setForm({ title: '', body: '', tag: 'General' });
    setShowForm(false);
  };

  const toggleLike = (id) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(prev => prev.filter(l => l !== id));
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts(prev => [...prev, id]);
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const [expandedPost, setExpandedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  const addComment = (postId) => {
    if (!commentText.trim()) return;
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { user: user.name, text: commentText }] }
        : p
    ));
    setCommentText('');
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

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
              💬 <span style={{ color: '#00E5FF' }}>Community</span>
            </h2>
            <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
              Ask questions, share knowledge, help each other grow
            </p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            + New Post
          </button>
        </div>

        {/* New Post Form */}
        {showForm && (
          <div className="card" style={{ marginBottom: '28px', borderColor: '#00E5FF' }}>
            <h3 style={{ color: '#00E5FF', marginBottom: '20px' }}>Create a Post</h3>

            <label>Post Title *</label>
            <input
              placeholder="Ask a question or share something useful..."
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <label>Category</label>
            <select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}>
              {tags.filter(t => t !== 'All').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <label>Description *</label>
            <textarea
              rows={4}
              placeholder="Explain in detail — the more context you give, the better answers you will get..."
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              style={{ resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" onClick={handlePost}>Post</button>
              <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Tag Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              style={{
                background: activeTag === t ? tagColors[t] + '33' : 'transparent',
                border: `1px solid ${activeTag === t ? tagColors[t] : '#223399'}`,
                color: activeTag === t ? tagColors[t] : '#6B7DB8',
                padding: '6px 18px', borderRadius: '20px', cursor: 'pointer',
                fontSize: '13px', fontWeight: activeTag === t ? 'bold' : 'normal'
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map(post => (
            <div key={post.id} className="card"
              style={{ borderLeft: `4px solid ${tagColors[post.tag] || '#6B7DB8'}` }}>

              {/* Post Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: tagColors[post.tag] + '33',
                    border: `2px solid ${tagColors[post.tag] || '#223399'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 'bold', color: tagColors[post.tag], flexShrink: 0
                  }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#CBD5F0' }}>{post.user}</div>
                    <div style={{ fontSize: '12px', color: '#6B7DB8' }}>{post.time}</div>
                  </div>
                </div>
                <span style={{
                  background: (tagColors[post.tag] || '#6B7DB8') + '22',
                  color: tagColors[post.tag] || '#6B7DB8',
                  border: `1px solid ${tagColors[post.tag] || '#6B7DB8'}`,
                  padding: '3px 12px', borderRadius: '12px', fontSize: '12px'
                }}>
                  {post.tag}
                </span>
              </div>

              {/* Post Content */}
              <h3 style={{ fontSize: '17px', marginBottom: '10px', color: '#FFFFFF' }}>{post.title}</h3>
              <p style={{ fontSize: '14px', color: '#CBD5F0', lineHeight: 1.6, marginBottom: '16px' }}>{post.body}</p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #1A2870' }}>
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: likedPosts.includes(post.id) ? '#FF6B9D' : '#6B7DB8',
                    fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                  {likedPosts.includes(post.id) ? '❤️' : '🤍'} {post.likes}
                </button>

                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#6B7DB8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                  💬 {post.comments.length} {post.comments.length === 1 ? 'reply' : 'replies'}
                </button>
              </div>

              {/* Comments Section */}
              {expandedPost === post.id && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1A2870' }}>
                  {post.comments.map((c, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '10px', marginBottom: '12px'
                    }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                        background: '#1A2870', border: '1px solid #223399',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: 'bold', color: '#00E5FF'
                      }}>
                        {c.user.charAt(0)}
                      </div>
                      <div style={{ background: '#1A2870', padding: '10px 14px', borderRadius: '8px', flex: 1 }}>
                        <div style={{ fontSize: '12px', color: '#00E5FF', fontWeight: 'bold', marginBottom: '4px' }}>
                          {c.user}
                        </div>
                        <div style={{ fontSize: '13px', color: '#CBD5F0' }}>{c.text}</div>
                      </div>
                    </div>
                  ))}

                  {/* Add Comment */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <input
                      placeholder="Write a reply..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addComment(post.id)}
                      style={{ margin: 0, flex: 1 }}
                    />
                    <button className="btn-primary"
                      onClick={() => addComment(post.id)}
                      style={{ padding: '10px 20px', flexShrink: 0 }}>
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#6B7DB8' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
              <p>No posts in this category yet. Be the first to post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}