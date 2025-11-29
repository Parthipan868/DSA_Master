import React from 'react';
import '../pages/Learn.css';

const StudyTips = () => {
  return (
    <section className="study-tips-section">
      <div className="container">
        <h2 className="section-title">Study Tips & Best Practices</h2>
        <div className="study-tips-container">
          <div className="study-tip">
            <div className="tip-box">
              <h3>1. Understand the Basics First</h3>
              <p>Before diving into complex problems, ensure you have a solid understanding of fundamental programming concepts and basic data structures.</p>
            </div>
            <div className="arrow-down"></div>
          </div>
          
          <div className="study-tip">
            <div className="tip-box">
              <h3>2. Practice Consistently</h3>
              <p>Dedicate regular time to practice coding problems. Consistency is more effective than long, infrequent study sessions.</p>
            </div>
            <div className="arrow-down"></div>
          </div>
          
          <div className="study-tip">
            <div className="tip-box">
              <h3>3. Solve Problems on Paper First</h3>
              <p>Before writing any code, try to solve the problem on paper. This helps in understanding the problem better and planning the solution.</p>
            </div>
            <div className="arrow-down"></div>
          </div>
          
          <div className="study-tip">
            <div className="tip-box">
              <h3>4. Analyze Time & Space Complexity</h3>
              <p>Always analyze the time and space complexity of your solutions. Aim for the most efficient solution first, then optimize if needed.</p>
            </div>
            <div className="arrow-down"></div>
          </div>
          
          <div className="study-tip">
            <div className="tip-box">
              <h3>5. Learn from Others' Solutions</h3>
              <p>After solving a problem, look at other people's solutions to learn different approaches and optimizations.</p>
            </div>
            <div className="arrow-down"></div>
          </div>
          
          <div className="study-tip">
            <div className="tip-box">
              <h3>6. Participate in Coding Contests</h3>
              <p>Join coding competitions to practice solving problems under time constraints and improve your problem-solving speed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyTips;
