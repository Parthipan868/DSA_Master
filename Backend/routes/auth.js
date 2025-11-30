const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                problemsSolved: user.problemsSolved
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                problemsSolved: user.problemsSolved
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        // Get user
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });

    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
});

// @route   PUT /api/auth/problem-status
// @desc    Update problem status
// @access  Private
router.put('/problem-status', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const { problemId, status } = req.body;

        if (!problemId || !status) {
            return res.status(400).json({ message: 'Problem ID and status are required' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find if problem status already exists
        const problemIndex = user.problemStatuses.findIndex(p => p.problemId === problemId);

        if (problemIndex > -1) {
            // Update existing status
            user.problemStatuses[problemIndex].status = status;
            user.problemStatuses[problemIndex].updatedAt = Date.now();
        } else {
            // Add new status
            user.problemStatuses.push({ problemId, status });
        }

        // Update total solved count
        user.problemsSolved = user.problemStatuses.filter(p => p.status === 'solved').length;

        await user.save();

        res.json({
            message: 'Status updated',
            problemStatuses: user.problemStatuses,
            problemsSolved: user.problemsSolved
        });

    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
