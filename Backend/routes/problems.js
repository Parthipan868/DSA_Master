const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// @route   GET /api/problems
// @desc    Get all problems with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { difficulty, topic, search } = req.query;
    let query = {};

    // Filter by difficulty
    if (difficulty && difficulty !== 'All Difficulties') {
      query.difficulty = difficulty.toLowerCase();
    }

    // Filter by topic
    if (topic && topic !== 'All Topics') {
      query.topics = topic.toLowerCase();
    }

    // Search by title
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { pattern: { $regex: search, $options: 'i' } }
      ];
    }

    const problems = await Problem.find(query).sort({ order: 1, createdAt: 1 });
    res.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/problems/:id
// @desc    Get single problem by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/problems/random
// @desc    Get a random problem
// @access  Public
router.get('/random/problem', async (req, res) => {
  try {
    const count = await Problem.countDocuments();
    const random = Math.floor(Math.random() * count);
    const problem = await Problem.findOne().skip(random);
    
    res.json(problem);
  } catch (error) {
    console.error('Error fetching random problem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/problems
// @desc    Create a new problem (Admin only - can add auth later)
// @access  Public (should be protected)
router.post('/', async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/problems/:id
// @desc    Update a problem (Admin only)
// @access  Public (should be protected)
router.put('/:id', async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    console.error('Error updating problem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/problems/:id
// @desc    Delete a problem (Admin only)
// @access  Public (should be protected)
router.delete('/:id', async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error('Error deleting problem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
