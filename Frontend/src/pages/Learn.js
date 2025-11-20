import React, { useState } from 'react';
import { FaBookOpen, FaVideo, FaFileAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import './Learn.css';

const Learn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathParam = searchParams.get('path');
  
  const [selectedPath, setSelectedPath] = useState(pathParam || 'beginner');
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [selectedResource, setSelectedResource] = useState({});

  // Common topics for all paths
  const commonTopics = [
    {
      id: 'arrays',
      title: 'Arrays',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'Introduction',
        'Largest Element',
        'Second Largest',
        'Check if Sorted',
        'Remove Duplicated'
      ]
    },
    {
      id: 'strings',
      title: 'Strings',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'String Basics',
        'Palindrome Check',
        'Reverse String',
        'Anagram',
        'Pattern Matching'
      ]
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'Introduction to Linked Lists',
        'Singly Linked List',
        'Doubly Linked List',
        'Circular Linked List',
        'Basic Operations'
      ]
    },
    {
      id: 'stacks-queues',
      title: 'Stacks & Queues',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'Stack Implementation',
        'Queue Implementation',
        'Stack Applications',
        'Queue Applications',
        'Priority Queue Basics'
      ]
    },
    {
      id: 'trees',
      title: 'Trees',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'Binary Tree Basics',
        'Tree Traversals',
        'Binary Search Tree',
        'Tree Properties',
        'Basic Tree Problems'
      ]
    },
    {
      id: 'graphs',
      title: 'Graphs',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'Graph Representation',
        'BFS Traversal',
        'DFS Traversal',
        'Graph Components',
        'Basic Graph Problems'
      ]
    },
    {
      id: 'dynamic-programming',
      title: 'Dynamic Programming',
      videoUrl: '',
      notesUrl: '',
      subtopics: [
        'DP Introduction',
        'Fibonacci Series',
        'Climbing Stairs',
        'House Robber',
        'Coin Change'
      ]
    }
  ];

  const learningPathsData = {
    beginner: {
      id: 'beginner',
      title: 'Beginner Path',
      level: 'Beginner',
      duration: '2-3 months',
      color: '#4ade80',
      topics: commonTopics
    },
    intermediate: {
      id: 'intermediate',
      title: 'Intermediate Path',
      level: 'Intermediate',
      duration: '3-4 months',
      color: '#60a5fa',
      topics: commonTopics
    },
    advanced: {
      id: 'advanced',
      title: 'Advanced Path',
      level: 'Advanced',
      duration: '4-6 months',
      color: '#f97316',
      topics: commonTopics
    }
  };

  const currentPathData = learningPathsData[selectedPath];

  const handlePathChange = (pathId) => {
    setSelectedPath(pathId);
    setExpandedTopic(null);
    setSelectedResource({});
    navigate(`/learn?path=${pathId}`);
  };

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
    if (!selectedResource[topicId]) {
      setSelectedResource({ ...selectedResource, [topicId]: 'video' });
    }
  };

  const handleResourceToggle = (topicId, resourceType) => {
    setSelectedResource({ ...selectedResource, [topicId]: resourceType });
  };

  return (
    <div className="learn-page">
      <section className="learn-hero">
        <div className="learn-hero-content">
          <h1 className="learn-title">Learn DSA</h1>
          <p className="learn-subtitle">
            Master Data Structures and Algorithms with curated resources.
          </p>
        </div>
      </section>

      {/* Path Selector Tabs */}
      <section className="path-selector">
        <div className="path-tabs">
          <button
            className={`path-tab ${selectedPath === 'beginner' ? 'active' : ''}`}
            onClick={() => handlePathChange('beginner')}
            style={{
              borderBottom: selectedPath === 'beginner' ? '3px solid #4ade80' : 'none'
            }}
          >
            Beginner Path
          </button>
          <button
            className={`path-tab ${selectedPath === 'intermediate' ? 'active' : ''}`}
            onClick={() => handlePathChange('intermediate')}
            style={{
              borderBottom: selectedPath === 'intermediate' ? '3px solid #60a5fa' : 'none'
            }}
          >
            Intermediate Path
          </button>
          <button
            className={`path-tab ${selectedPath === 'advanced' ? 'active' : ''}`}
            onClick={() => handlePathChange('advanced')}
            style={{
              borderBottom: selectedPath === 'advanced' ? '3px solid #f97316' : 'none'
            }}
          >
            Advanced Path
          </button>
        </div>
      </section>

      {/* Topics Accordion */}
      <section className="topics-section">
        <div className="topics-container">
          {currentPathData.topics.map((topic) => (
            <div key={topic.id} className="topic-accordion">
              <div
                className="topic-accordion-header"
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="topic-header-left">
                  <FaBookOpen className="topic-icon-book" />
                  <span className="topic-name">{topic.title}</span>
                </div>
                <div className="topic-header-right">
                  {expandedTopic === topic.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {expandedTopic === topic.id && (
                <div className="topic-accordion-content">
                  {/* Resource Type Selector */}
                  <div className="resource-selector">
                    <button
                      className={`resource-tab ${selectedResource[topic.id] === 'video' || !selectedResource[topic.id] ? 'active' : ''}`}
                      onClick={() => handleResourceToggle(topic.id, 'video')}
                    >
                      <FaVideo className="resource-icon" />
                      <span>Video Tutorial</span>
                    </button>
                    <button
                      className={`resource-tab ${selectedResource[topic.id] === 'notes' ? 'active' : ''}`}
                      onClick={() => handleResourceToggle(topic.id, 'notes')}
                    >
                      <FaFileAlt className="resource-icon" />
                      <span>Notes & Articles</span>
                    </button>
                  </div>

                  {/* Resource Content */}
                  <div className="resource-content">
                    {(selectedResource[topic.id] === 'video' || !selectedResource[topic.id]) && (
                      <div className="video-content">
                        {topic.videoUrl ? (
                          <iframe
                            src={topic.videoUrl}
                            title={`${topic.title} Video Tutorial`}
                            allowFullScreen
                            className="video-iframe"
                          />
                        ) : (
                          <div className="placeholder-content">
                            <h3>Video Tutorial Coming Soon</h3>
                            <p>Topics covered in this video:</p>
                            <ul className="subtopics-list">
                              {topic.subtopics.map((subtopic, index) => (
                                <li key={index}>{subtopic}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedResource[topic.id] === 'notes' && (
                      <div className="notes-content">
                        {topic.notesUrl ? (
                          <iframe
                            src={topic.notesUrl}
                            title={`${topic.title} Notes`}
                            className="notes-iframe"
                          />
                        ) : (
                          <div className="placeholder-content">
                            <h3>Notes & Articles Coming Soon</h3>
                            <p>Topics covered in these notes:</p>
                            <ul className="subtopics-list">
                              {topic.subtopics.map((subtopic, index) => (
                                <li key={index}>{subtopic}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Study Tips Section */}
      <section className="study-tips">
        <div className="section-header">
          <h2 className="section-title">Study Tips & Best Practices</h2>
        </div>

        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-number">1</div>
            <h3>Consistent Practice</h3>
            <p>Dedicate at least 1-2 hours daily to solving problems and reviewing concepts.</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">2</div>
            <h3>Understand Patterns</h3>
            <p>Focus on understanding problem patterns rather than memorizing solutions.</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">3</div>
            <h3>Build Foundation</h3>
            <p>Master fundamentals before jumping to advanced topics.</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">4</div>
            <h3>Track Progress</h3>
            <p>Keep a log of solved problems and review them periodically.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learn;
