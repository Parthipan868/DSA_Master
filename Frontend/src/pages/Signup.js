import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCode, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authAPI } from '../services/api';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long!');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            console.log('Signup successful:', response);
            // Logout to force user to login manually
            authAPI.logout();
            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    {/* Logo and Brand */}
                    <div className="auth-brand">
                        <div className="auth-logo">
                            <FaCode />
                        </div>
                        <h1 className="auth-title">DSA Master</h1>
                        <p className="auth-subtitle">Create your account to start learning</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {/* Signup Form */}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <FaLock className="input-icon" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input type="checkbox" required disabled={loading} />
                                <span className="checkbox-label">I agree to Terms & Conditions</span>
                            </label>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="auth-divider">
                            <span>Or</span>
                        </div>

                        <div className="auth-alternate">
                            <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
