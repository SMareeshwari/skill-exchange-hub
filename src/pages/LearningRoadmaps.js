import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LearningRoadmaps() {
  const navigate = useNavigate();
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const roadmaps = [
    {
      id: 1, title: 'Python Developer', icon: '🐍', color: '#00E5FF',
      duration: '12 weeks', level: 'Beginner to Advanced',
      description: 'Master Python from basics to building real-world applications',
      steps: [
        { id: 'py1', week: 'Week 1–2', title: 'Python Basics', topics: ['Variables & Data Types', 'Conditions & Loops', 'Functions', 'String Manipulation'], type: 'Foundation' },
        { id: 'py2', week: 'Week 3–4', title: 'Data Structures', topics: ['Lists & Tuples', 'Dictionaries & Sets', 'List Comprehension', 'Nested Structures'], type: 'Core' },
        { id: 'py3', week: 'Week 5–6', title: 'Object Oriented Programming', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation'], type: 'Core' },
        { id: 'py4', week: 'Week 7–8', title: 'File Handling & Modules', topics: ['Reading & Writing Files', 'OS Module', 'JSON Handling', 'Error Handling'], type: 'Intermediate' },
        { id: 'py5', week: 'Week 9–10', title: 'Libraries & Frameworks', topics: ['NumPy Basics', 'Pandas for Data', 'Matplotlib Charts', 'Requests Library'], type: 'Advanced' },
        { id: 'py6', week: 'Week 11–12', title: 'Final Project', topics: ['Build a Web Scraper', 'Data Analysis Project', 'REST API with Flask', 'Deploy to Cloud'], type: 'Project' },
      ]
    },
    {
      id: 2, title: 'Frontend Developer', icon: '💻', color: '#FFD740',
      duration: '16 weeks', level: 'Beginner to Advanced',
      description: 'Build modern, responsive web applications from scratch',
      steps: [
        { id: 'fe1', week: 'Week 1–2', title: 'HTML5 Fundamentals', topics: ['HTML Structure', 'Semantic Tags', 'Forms & Tables', 'Accessibility Basics'], type: 'Foundation' },
        { id: 'fe2', week: 'Week 3–4', title: 'CSS3 & Styling', topics: ['Box Model', 'Flexbox Layout', 'CSS Grid', 'Responsive Design & Media Queries'], type: 'Foundation' },
        { id: 'fe3', week: 'Week 5–7', title: 'JavaScript Essentials', topics: ['Variables & Functions', 'DOM Manipulation', 'Events & Listeners', 'Fetch API & Promises'], type: 'Core' },
        { id: 'fe4', week: 'Week 8–10', title: 'React JS', topics: ['Components & JSX', 'useState & useEffect', 'React Router', 'Props & State Management'], type: 'Core' },
        { id: 'fe5', week: 'Week 11–13', title: 'Advanced React', topics: ['Context API', 'Custom Hooks', 'Performance Optimization', 'Testing with Jest'], type: 'Advanced' },
        { id: 'fe6', week: 'Week 14–16', title: 'Final Projects', topics: ['Portfolio Website', 'E-commerce UI', 'Dashboard App', 'Deploy on Netlify/Vercel'], type: 'Project' },
      ]
    },
    {
      id: 3, title: 'Data Science', icon: '📊', color: '#A855F7',
      duration: '20 weeks', level: 'Intermediate',
      description: 'From data analysis to machine learning and AI',
      steps: [
        { id: 'ds1', week: 'Week 1–3', title: 'Python for Data', topics: ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning', 'Exploratory Analysis'], type: 'Foundation' },
        { id: 'ds2', week: 'Week 4–6', title: 'Data Visualization', topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Storytelling with Data'], type: 'Core' },
        { id: 'ds3', week: 'Week 7–10', title: 'Statistics & Math', topics: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Linear Algebra Basics'], type: 'Core' },
        { id: 'ds4', week: 'Week 11–14', title: 'Machine Learning', topics: ['Supervised Learning', 'Classification & Regression', 'Decision Trees', 'Model Evaluation'], type: 'Advanced' },
        { id: 'ds5', week: 'Week 15–17', title: 'Deep Learning', topics: ['Neural Networks', 'TensorFlow Basics', 'CNN for Images', 'NLP Basics'], type: 'Advanced' },
        { id: 'ds6', week: 'Week 18–20', title: 'Capstone Project', topics: ['Real Dataset Analysis', 'ML Model Deployment', 'Presentation', 'GitHub Portfolio'], type: 'Project' },
      ]
    },
    {
      id: 4, title: 'UI/UX Design', icon: '🎨', color: '#FF6B9D',
      duration: '10 weeks', level: 'Beginner',
      description: 'Design beautiful, user-centered digital experiences',
      steps: [
        { id: 'ux1', week: 'Week 1–2', title: 'Design Fundamentals', topics: ['Color Theory', 'Typography', 'Layout & Spacing', 'Visual Hierarchy'], type: 'Foundation' },
        { id: 'ux2', week: 'Week 3–4', title: 'UX Research', topics: ['User Personas', 'User Journey Maps', 'Competitive Analysis', 'Usability Testing'], type: 'Core' },
        { id: 'ux3', week: 'Week 5–6', title: 'Figma Mastery', topics: ['Frames & Components', 'Auto Layout', 'Prototyping', 'Design Systems'], type: 'Core' },
        { id: 'ux4', week: 'Week 7–8', title: 'Interaction Design', topics: ['Micro-interactions', 'Animations', 'Responsive Mockups', 'Handoff to Developers'], type: 'Advanced' },
        { id: 'ux5', week: 'Week 9–10', title: 'Portfolio Project', topics: ['End-to-End App Design', 'Case Study Writing', 'Behance/Dribbble Profile', 'Interview Prep'], type: 'Project' },
      ]
    },
    {
      id: 5, title: 'Public Speaking', icon: '🎤', color: '#00E5CC',
      duration: '8 weeks', level: 'All Levels',
      description: 'Build confidence and communicate powerfully in any situation',
      steps: [
        { id: 'ps1', week: 'Week 1–2', title: 'Foundations of Speaking', topics: ['Overcoming Fear', 'Voice Modulation', 'Body Language', 'Eye Contact'], type: 'Foundation' },
        { id: 'ps2', week: 'Week 3–4', title: 'Speech Structure', topics: ['Opening Hook', 'Message Clarity', 'Storytelling', 'Strong Closing'], type: 'Core' },
        { id: 'ps3', week: 'Week 5–6', title: 'Presentation Skills', topics: ['Slide Design Basics', 'Handling Q&A', 'Impromptu Speaking', 'Technical Presentations'], type: 'Intermediate' },
        { id: 'ps4', week: 'Week 7–8', title: 'Real Practice', topics: ['Record & Review Yourself', 'Present to a Group', 'Get Feedback', 'Final Speech Performance'], type: 'Project' },
      ]
    },
    {
      id: 6, title: 'DSA & Competitive Coding', icon: '⚔️', color: '#FFAB40',
      duration: '14 weeks', level: 'Intermediate',
      description: 'Master data structures and ace coding interviews',
      steps: [
        { id: 'dsa1', week: 'Week 1–2', title: 'Arrays & Strings', topics: ['Array Traversal', 'Two Pointer Technique', 'Sliding Window', 'String Problems'], type: 'Foundation' },
        { id: 'dsa2', week: 'Week 3–4', title: 'Linked Lists & Stacks', topics: ['Singly Linked List', 'Doubly Linked List', 'Stack & Queue', 'Applications'], type: 'Core' },
        { id: 'dsa3', week: 'Week 5–6', title: 'Trees & Graphs', topics: ['Binary Trees', 'BST Operations', 'BFS & DFS', 'Graph Traversal'], type: 'Core' },
        { id: 'dsa4', week: 'Week 7–9', title: 'Recursion & DP', topics: ['Recursion Basics', 'Memoization', 'Tabulation', 'Classic DP Problems'], type: 'Advanced' },
        { id: 'dsa5', week: 'Week 10–12', title: 'Sorting & Searching', topics: ['Merge Sort & Quick Sort', 'Binary Search', 'Heap & Priority Queue', 'Greedy Algorithms'], type: 'Advanced' },
        { id: 'dsa6', week: 'Week 13–14', title: 'Interview Preparation', topics: ['LeetCode Top 50', 'Mock Interviews', 'Time Complexity Analysis', 'System Design Basics'], type: 'Project' },
      ]
    },
  ];

  const typeColors = {
    Foundation: '#00E5FF',
    Core: '#A855F7',
    Intermediate: '#FFD740',
    Advanced: '#FF6B9D',
    Project: '#00E5CC',
  };

  const toggleStep = (stepId) => {
    setCompletedSteps(prev =>
      prev.includes(stepId) ? prev.filter(s => s !== stepId) : [...prev, stepId]
    );
  };

  const getProgress = (roadmap) => {
    const total = roadmap.steps.length;
    const done = roadmap.steps.filter(s => completedSteps.includes(s.id)).length;
    return Math.round((done / total) * 100);
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

        {!selectedRoadmap ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '6px' }}>
                🗺️ Learning <span style={{ color: '#7C3AED' }}>Roadmaps</span>
              </h2>
              <p style={{ color: '#6B7DB8', fontSize: '14px' }}>
                Structured step-by-step paths to master any skill — follow the roadmap and track your progress
              </p>
            </div>

            {/* Roadmap Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {roadmaps.map(r => {
                const progress = getProgress(r);
                return (
                  <div
                    key={r.id}
                    className="card"
                    onClick={() => setSelectedRoadmap(r)}
                    style={{ cursor: 'pointer', borderTop: `3px solid ${r.color}` }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Icon & Title */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{
                        width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                        background: r.color + '22', border: `2px solid ${r.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                      }}>
                        {r.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', color: '#FFFFFF', marginBottom: '4px' }}>{r.title}</h3>
                        <span style={{ fontSize: '12px', color: r.color }}>{r.level}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '13px', color: '#6B7DB8', marginBottom: '16px', lineHeight: 1.5 }}>
                      {r.description}
                    </p>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '12px', color: '#6B7DB8' }}>⏱ {r.duration}</span>
                      <span style={{ fontSize: '12px', color: '#6B7DB8' }}>📌 {r.steps.length} stages</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#6B7DB8' }}>Progress</span>
                        <span style={{ fontSize: '12px', color: r.color, fontWeight: 'bold' }}>{progress}%</span>
                      </div>
                      <div style={{ height: '6px', background: '#1A2870', borderRadius: '3px' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px',
                          width: `${progress}%`,
                          background: `linear-gradient(90deg, ${r.color}, ${r.color}88)`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>

                    <button
                      className="btn-primary"
                      style={{ width: '100%', marginTop: '12px', background: r.color + 'DD', color: '#050714' }}
                    >
                      {progress > 0 ? 'Continue Learning' : 'Start Roadmap'} →
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Roadmap Detail View */
          <>
            <button className="btn-outline" onClick={() => setSelectedRoadmap(null)}
              style={{ marginBottom: '24px' }}>
              ← All Roadmaps
            </button>

            {/* Roadmap Header */}
            <div className="card" style={{
              marginBottom: '32px',
              background: 'linear-gradient(135deg, #0D1545, #1A0050)',
              borderColor: selectedRoadmap.color,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{
                  width: '68px', height: '68px', borderRadius: '16px',
                  background: selectedRoadmap.color + '22',
                  border: `2px solid ${selectedRoadmap.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px'
                }}>
                  {selectedRoadmap.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>{selectedRoadmap.title}</h2>
                  <p style={{ color: '#6B7DB8', fontSize: '14px', marginBottom: '8px' }}>
                    {selectedRoadmap.description}
                  </p>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <span style={{ fontSize: '13px', color: '#6B7DB8' }}>⏱ {selectedRoadmap.duration}</span>
                    <span style={{ fontSize: '13px', color: '#6B7DB8' }}>📊 {selectedRoadmap.level}</span>
                    <span style={{ fontSize: '13px', color: '#6B7DB8' }}>📌 {selectedRoadmap.steps.length} stages</span>
                  </div>
                </div>
              </div>

              {/* Overall Progress */}
              <div style={{ textAlign: 'center', minWidth: '120px' }}>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: selectedRoadmap.color }}>
                  {getProgress(selectedRoadmap)}%
                </div>
                <div style={{ fontSize: '12px', color: '#6B7DB8' }}>Complete</div>
                <div style={{ height: '6px', background: '#1A2870', borderRadius: '3px', marginTop: '8px' }}>
                  <div style={{
                    height: '100%', borderRadius: '3px',
                    width: `${getProgress(selectedRoadmap)}%`,
                    background: selectedRoadmap.color
                  }} />
                </div>
              </div>
            </div>

            {/* Stage Legend */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {Object.entries(typeColors).map(([type, color]) => (
                <span key={type} style={{
                  background: color + '22', color, border: `1px solid ${color}`,
                  padding: '4px 14px', borderRadius: '12px', fontSize: '12px'
                }}>
                  {type}
                </span>
              ))}
            </div>

            {/* Steps — Vertical Timeline */}
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: '23px', top: '0', bottom: '0',
                width: '2px', background: 'linear-gradient(180deg, ' + selectedRoadmap.color + ', #1A2870)'
              }} />

              {selectedRoadmap.steps.map((step, index) => {
                const done = completedSteps.includes(step.id);
                return (
                  <div key={step.id} style={{
                    display: 'flex', gap: '24px', marginBottom: '28px',
                    position: 'relative'
                  }}>
                    {/* Timeline Node */}
                    <div
                      onClick={() => toggleStep(step.id)}
                      style={{
                        width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
                        background: done ? selectedRoadmap.color : '#0D1545',
                        border: `2px solid ${done ? selectedRoadmap.color : '#223399'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', zIndex: 1, fontSize: '18px',
                        transition: 'all 0.2s ease'
                      }}>
                      {done ? '✓' : index + 1}
                    </div>

                    {/* Step Card */}
                    <div className="card" style={{
                      flex: 1,
                      borderLeft: `3px solid ${typeColors[step.type]}`,
                      opacity: done ? 0.7 : 1
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6B7DB8', marginBottom: '4px', display: 'block' }}>
                            {step.week}
                          </span>
                          <h3 style={{
                            fontSize: '18px',
                            color: done ? '#6B7DB8' : '#FFFFFF',
                            textDecoration: done ? 'line-through' : 'none'
                          }}>
                            {step.title}
                          </h3>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{
                            background: typeColors[step.type] + '22',
                            color: typeColors[step.type],
                            border: `1px solid ${typeColors[step.type]}`,
                            padding: '3px 12px', borderRadius: '12px', fontSize: '12px'
                          }}>
                            {step.type}
                          </span>
                          <button
                            onClick={() => toggleStep(step.id)}
                            style={{
                              background: done ? selectedRoadmap.color + '22' : 'transparent',
                              border: `1px solid ${done ? selectedRoadmap.color : '#223399'}`,
                              color: done ? selectedRoadmap.color : '#6B7DB8',
                              padding: '5px 14px', borderRadius: '6px', cursor: 'pointer',
                              fontSize: '12px', fontWeight: 'bold'
                            }}>
                            {done ? '✓ Done' : 'Mark Done'}
                          </button>
                        </div>
                      </div>

                      {/* Topics Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {step.topics.map(topic => (
                          <div key={topic} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: '#1A2870', padding: '8px 12px', borderRadius: '6px'
                          }}>
                            <div style={{
                              width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                              background: typeColors[step.type]
                            }} />
                            <span style={{
                              fontSize: '13px',
                              color: done ? '#6B7DB8' : '#CBD5F0'
                            }}>
                              {topic}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Banner */}
            {getProgress(selectedRoadmap) === 100 && (
              <div style={{
                background: 'linear-gradient(135deg, #00E5CC22, #A855F722)',
                border: '1px solid #00E5CC',
                borderRadius: '12px', padding: '24px', textAlign: 'center', marginTop: '20px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
                <h3 style={{ color: '#00E5CC', fontSize: '22px', marginBottom: '8px' }}>
                  Roadmap Complete!
                </h3>
                <p style={{ color: '#CBD5F0', fontSize: '14px' }}>
                  Congratulations! You have completed the {selectedRoadmap.title} roadmap.
                  Create a Learning Contract to get certified!
                </p>
                <button className="btn-primary"
                  onClick={() => navigate('/contracts')}
                  style={{ marginTop: '16px', padding: '12px 28px' }}>
                  Get Certified →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}