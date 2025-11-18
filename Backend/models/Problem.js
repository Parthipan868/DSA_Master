const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  topics: [{
    type: String,
    trim: true
  }],
  pattern: {
    type: String,
    trim: true
  },
  companies: [{
    type: String,
    trim: true
  }],
  leetcodeUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: null
  },
  notesUrl: {
    type: String,
    default: null
  },
  points: {
    type: Number,
    default: 10
  },
  hasDiscussion: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster searches
ProblemSchema.index({ title: 'text' });
ProblemSchema.index({ difficulty: 1 });
ProblemSchema.index({ topics: 1 });

module.exports = mongoose.model('Problem', ProblemSchema);
