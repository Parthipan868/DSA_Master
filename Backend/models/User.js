const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/lego/1.jpg'
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  problemStatuses: [{
    problemId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['solved', 'attempted', 'unsolved'],
      default: 'unsolved'
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
