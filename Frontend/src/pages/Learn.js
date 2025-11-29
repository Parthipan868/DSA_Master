import React, { useState } from 'react';
import { FaBookOpen, FaVideo, FaFileAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Footer from '../components/Footer';
import './Learn.css';

const Learn = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [selectedResource, setSelectedResource] = useState({});

  // Common topics for all paths
  const commonTopics = [
    {
      id: 'arrays',
      title: 'Arrays',
      videoUrl: 'https://www.youtube.com/embed/37E9ckMDdTk',
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
      videoUrl: 'https://www.youtube.com/embed/Dt6gzsNrghQ',
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
      id: 'trees',
      title: 'Trees',
      videoUrl: 'https://www.youtube.com/embed/YAdLFsTG70w',
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
      id: 'heaps',
      title: 'Heaps',
      videoUrl: 'https://www.youtube.com/embed/NEtwJASLU8Q',
      notesUrl: '',
      subtopics: [
        'Heap Basics',
        'Heap Operations',
        'Heap Sort',
        'Priority Queues',
        'Heap Applications'
      ]
    },
    {
      id: 'hashing',
      title: 'Hashing',
      videoUrl: 'https://www.youtube.com/embed/KEs5UyBJ39g',
      notesUrl: '',
      subtopics: [
        'Hash Functions',
        'Hash Tables',
        'Collision Handling',
        'Hashing Applications',
        'Performance Analysis'
      ]
    },
    {
      id: 'sorting',
      title: 'Sorting',
      videoUrl: 'https://www.youtube.com/embed/HGk_ypEuS24',
      notesUrl: '',
      subtopics: [
        'Bubble Sort',
        'Selection Sort',
        'Insertion Sort',
        'Merge Sort',
        'Quick Sort',
        'Heap Sort',
        'Comparison of Sorts'
      ]
    },
    {
      id: 'backtracking',
      title: 'Backtracking',
      videoUrl: 'https://www.youtube.com/embed/L0NxT2i-LOY',
      notesUrl: '',
      subtopics: [
        'Introduction',
        'N-Queens Problem',
        'Sudoku Solver',
        'Subset Generation',
        'Permutations'
      ]
    },
    {
      id: 'greedy',
      title: 'Greedy Algorithms',
      videoUrl: 'https://www.youtube.com/embed/DIX2p7vb9co',
      notesUrl: '',
      subtopics: [
        'Greedy Approach',
        'Activity Selection',
        'Huffman Coding',
        'Dijkstra\'s Algorithm',
        'Minimum Spanning Tree'
      ]
    }
  ];


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

      <div className="learn-container">
        <div className="topics-container">
          <div className="topics-list">
            {commonTopics.map((topic) => (
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Learn;
