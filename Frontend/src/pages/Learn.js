import React, { useState } from 'react';
import { FaBookOpen, FaVideo, FaFileAlt, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import { dsaTopics } from '../data/LearnTopics';
import ReactMarkdown from 'react-markdown';
import './Learn.css';

const Learn = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [selectedResource, setSelectedResource] = useState({});


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
            {dsaTopics.map((topic) => (
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
                          {topic.notes ? (
                            <div className="notes-container">
                              {/* Introduction/Summary */}
                              <div className="notes-introduction">
                                <ReactMarkdown>{topic.notes.introduction}</ReactMarkdown>
                              </div>

                              {/* Articles Section */}
                              {topic.notes.articles && topic.notes.articles.length > 0 && (
                                <div className="articles-section">
                                  <h3 className="articles-heading">📚 Recommended Articles & Resources</h3>
                                  <div className="articles-grid">
                                    {topic.notes.articles.map((article, index) => (
                                      <a
                                        key={index}
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="article-card"
                                      >
                                        <div className="article-header">
                                          <h4>{article.title}</h4>
                                          <FaExternalLinkAlt className="external-icon" />
                                        </div>
                                        <p className="article-description">{article.description}</p>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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
