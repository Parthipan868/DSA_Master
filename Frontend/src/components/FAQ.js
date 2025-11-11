import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './FAQ.css';

const faqData = [
  {
    question: 'Is it okay to start interview prep from scratch if I have less experience?',
    answer: 'Absolutely! Our platform is designed for learners at all levels. We provide structured learning paths that help you build foundational knowledge before tackling advanced concepts.'
  },
  {
    question: 'How do I balance college academics with interview prep?',
    answer: 'We recommend dedicating 1-2 hours daily to DSA practice. Our bite-sized problems and structured approach make it easy to maintain consistency alongside your studies.'
  },
  {
    question: 'What makes DSA Master different from other platforms?',
    answer: 'DSA Master offers curated problem sets, company-specific questions, detailed video explanations, and progress tracking to ensure comprehensive preparation'
  },
  {
    question: 'Are your resources suitable for non-CS background students?',
    answer: 'Yes! We provide fundamental concepts and explanations that help students from any background understand and master data structures and algorithms.'
  },
  {
    question: 'Can I get a trial or preview before committing?',
    answer: 'You can access many of our problems and resources for free. Simply create an account to start practicing and exploring our content'
  },
  {
    question: 'Should I focus on quantity or quality of problems?',
    answer: 'Quality over quantity! Focus on understanding patterns and concepts rather than just solving many problems. Our curated sets help you learn efficiently'
  },
  {
    question: 'What are the essential things to cover in core coding subjects?',
    answer: 'Focus on Arrays, Strings, LinkedLists, Trees, Graphs, Dynamic Programming, and System Design basics. Our learning paths cover all these systematically.'
  },
  {
    question: 'How should I approach system design interview questions?',
    answer: 'Start with understanding basic system components, then practice designing simple systems before moving to complex architectures. We provide resources for each level'
  },
  {
    question: "What's the best way to prepare for coding interviews?",
    answer: 'Consistent practice, understanding patterns, mock interviews, and time management. Our platform provides all these tools in one place'
  },
  {
    question: 'How long does it typically take to become interview-ready?',
    answer: 'With consistent daily practice (1-2 hours), most students become interview-ready in 3-6 months. The timeline varies based on your starting point and target companies.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
