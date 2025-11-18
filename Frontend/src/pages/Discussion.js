import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import './Discussion.css';

const Discussion = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [discussions, setDiscussions] = useState([]);

  // Mock problem data - replace with actual data from your backend
  const problem = {
    id: problemId,
    title: 'Merge Intervals',
    difficulty: 'medium'
  };

  const handleBackToProblems = () => {
    navigate('/problems');
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      const newDiscussion = {
        id: Date.now(),
        user: 'P',
        userName: 'User',
        comment: comment,
        timestamp: new Date().toLocaleString()
      };
      setDiscussions([...discussions, newDiscussion]);
      setComment('');
    }
  };

  return (
    <div className="discussion-container">
      <button className="back-button" onClick={handleBackToProblems}>
        <FaArrowLeft /> Back to Problems
      </button>

      <div className="discussion-header">
        <h1>{problem.title}</h1>
        <p className="discussion-subtitle">Discussion</p>
      </div>

      <div className="join-conversation">
        <h2>Join the Conversation</h2>
        <div className="comment-input-section">
          <div className="user-avatar">P</div>
          <div className="input-wrapper">
            <textarea
              placeholder="Share your thoughts, solution, or ask a question..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <button className="post-button" onClick={handlePostComment}>
              <FaPaperPlane /> Post
            </button>
          </div>
        </div>
      </div>

      <div className="discussions-list">
        {discussions.length === 0 ? (
          <div className="no-discussions">
            <div className="no-discussions-icon">💬</div>
            <p className="no-discussions-title">No discussions yet.</p>
            <p className="no-discussions-text">Be the first to share your thoughts!</p>
          </div>
        ) : (
          discussions.map((disc) => (
            <div key={disc.id} className="discussion-item">
              <div className="discussion-avatar">{disc.user}</div>
              <div className="discussion-content">
                <div className="discussion-meta">
                  <span className="discussion-user">{disc.userName}</span>
                  <span className="discussion-time">{disc.timestamp}</span>
                </div>
                <p className="discussion-text">{disc.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Discussion;
