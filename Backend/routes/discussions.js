const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const Problem = require('../models/Problem');

// @route   GET /api/discussions/:problemId
// @desc    Get all discussions for a problem
// @access  Public
router.get('/:problemId', async (req, res) => {
  try {
    const discussions = await Discussion.find({ problemId: req.params.problemId })
      .sort({ createdAt: -1 });
    
    res.json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/discussions
// @desc    Create a new discussion/comment
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { problemId, userName, userAvatar, comment } = req.body;

    // Verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const discussion = new Discussion({
      problemId,
      userName: userName || 'Anonymous User',
      userAvatar: userAvatar || 'P',
      comment
    });

    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/discussions/:id/reply
// @desc    Add a reply to a discussion
// @access  Public
router.post('/:id/reply', async (req, res) => {
  try {
    const { userName, comment } = req.body;

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    discussion.replies.push({
      userName: userName || 'Anonymous User',
      comment,
      createdAt: new Date()
    });

    await discussion.save();
    res.json(discussion);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/discussions/:id/like
// @desc    Like a discussion
// @access  Public
router.put('/:id/like', async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    res.json(discussion);
  } catch (error) {
    console.error('Error liking discussion:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/discussions/:id
// @desc    Delete a discussion
// @access  Public (should be protected - owner only)
router.delete('/:id', async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
