const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous discussions
  },
  userName: {
    type: String,
    default: 'Anonymous User'
  },
  userAvatar: {
    type: String,
    default: 'P'
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for faster queries
DiscussionSchema.index({ problemId: 1, createdAt: -1 });

module.exports = mongoose.model('Discussion', DiscussionSchema);
