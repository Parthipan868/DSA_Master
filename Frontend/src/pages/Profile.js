import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaSignOutAlt,
    FaTrophy,
    FaBolt,
    FaCalendarAlt,
    FaChartPie,
    FaCheckCircle,
    FaStar,
    FaCode
} from 'react-icons/fa';
import Footer from '../components/Footer';
import { authAPI } from '../services/api';
import { problems as problemsData } from './ProblemsData';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        email: "",
        points: 0,
        streak: 0,
        solved: {
            easy: 0,
            medium: 0,
            hard: 0,
            total: 0
        },
        totalProblems: {
            easy: 0,
            medium: 0,
            hard: 0
        }
    });

    // Generate activity grid for all 12 months
    // 5 columns x 7 rows = 35 cells (enough for 31 days)
    const [activityData, setActivityData] = useState(
        Array(12).fill(null).map(() => Array(35).fill(0))
    );

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!authAPI.isAuthenticated()) {
                navigate('/login');
                return;
            }

            try {
                const currentUser = await authAPI.getCurrentUser();

                // Calculate total problems by difficulty
                const totalCounts = {
                    easy: problemsData.filter(p => p.difficulty === 'Easy').length,
                    medium: problemsData.filter(p => p.difficulty === 'Medium').length,
                    hard: problemsData.filter(p => p.difficulty === 'Hard').length
                };

                // Calculate solved problems
                let solvedCounts = { easy: 0, medium: 0, hard: 0, total: 0 };
                let points = 0;
                const newActivityData = Array(12).fill(null).map(() => Array(35).fill(0));

                if (currentUser.problemStatuses) {
                    const solvedStatus = currentUser.problemStatuses.filter(s => s.status === 'solved');
                    const solvedIds = solvedStatus.map(s => s.problemId.toString());

                    const solvedProblems = problemsData.filter(p => solvedIds.includes(p.id.toString()));

                    solvedCounts = {
                        easy: solvedProblems.filter(p => p.difficulty === 'Easy').length,
                        medium: solvedProblems.filter(p => p.difficulty === 'Medium').length,
                        hard: solvedProblems.filter(p => p.difficulty === 'Hard').length,
                        total: solvedProblems.length
                    };

                    // Calculate points
                    points = solvedProblems.reduce((sum, p) => sum + (p.points || 10), 0);

                    // Populate Activity Data
                    solvedStatus.forEach(status => {
                        if (status.updatedAt) {
                            const date = new Date(status.updatedAt);
                            const month = date.getMonth(); // 0-11
                            const day = date.getDate() - 1; // 0-30

                            // Map day to grid position
                            // We use a simple mapping where day index corresponds to the cell index
                            if (month >= 0 && month < 12 && day >= 0 && day < 35) {
                                newActivityData[month][day] += 1;
                            }
                        }
                    });
                }

                setUser({
                    name: currentUser.name,
                    email: currentUser.email,
                    points: points,
                    streak: 0,
                    solved: solvedCounts,
                    totalProblems: totalCounts
                });
                setActivityData(newActivityData);

            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        authAPI.logout();
        navigate('/login');
    };

    // Generate months including December
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const calculatePercentage = (solved, total) => {
        if (total === 0) return 0;
        return Math.round((solved / total) * 100);
    };

    const easyPercent = calculatePercentage(user.solved.easy, user.totalProblems.easy);
    const mediumPercent = calculatePercentage(user.solved.medium, user.totalProblems.medium);
    const hardPercent = calculatePercentage(user.solved.hard, user.totalProblems.hard);

    // Calculate pie chart percentages
    const totalSolved = user.solved.total;
    const easySlice = totalSolved > 0 ? (user.solved.easy / totalSolved) * 100 : 0;
    const mediumSlice = totalSolved > 0 ? (user.solved.medium / totalSolved) * 100 : 0;
    const hardSlice = totalSolved > 0 ? (user.solved.hard / totalSolved) * 100 : 0;

    if (loading) {
        return <div className="profile-page"><div className="profile-container">Loading...</div></div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Header Section */}
                <div className="profile-header-card">
                    <div className="profile-user-info">
                        <div className="profile-avatar">
                            <FaUser />
                        </div>
                        <div className="profile-details">
                            <h1>{user.name}</h1>
                            <p className="profile-email">{user.email}</p>
                            <div className="profile-stats-row">
                                <span className="stat-item">
                                    <FaTrophy className="stat-icon" /> {user.points} points
                                </span>
                                <span className="stat-item">
                                    <FaBolt className="stat-icon" /> {user.streak} day streak
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Activity Calendar */}
                <div className="profile-card activity-card">
                    <div className="card-header">
                        <FaCalendarAlt className="card-icon" />
                        <h2>Activity Calendar</h2>
                    </div>
                    <div className="activity-calendar-wrapper">
                        <div className="activity-scroll-container">
                            <div className="activity-months-labels">
                                {months.map((month, index) => (
                                    <div key={index} className="month-label">{month}</div>
                                ))}
                            </div>
                            <div className="activity-grid">
                                {months.map((month, monthIndex) => (
                                    <div key={monthIndex} className="month-grid">
                                        {Array(7).fill(null).map((_, row) => (
                                            <div key={row} className="week-row">
                                                {Array(5).fill(null).map((_, col) => {
                                                    const dayIndex = row + col * 7;
                                                    const count = activityData[monthIndex]?.[dayIndex] || 0;
                                                    let level = 0;
                                                    if (count > 0) level = 1;
                                                    if (count > 2) level = 2;
                                                    if (count > 4) level = 3;
                                                    if (count > 6) level = 4;

                                                    return (
                                                        <div
                                                            key={col}
                                                            className={`activity-cell level-${level}`}
                                                            title={`${month} ${dayIndex + 1}: ${count} problems`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="activity-legend">
                            <span className="legend-text">Less</span>
                            <div className="legend-squares">
                                {[0, 1, 2, 3, 4].map(level => (
                                    <div key={level} className={`legend-square level-${level}`} />
                                ))}
                            </div>
                            <span className="legend-text">More</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {/* Solved Problems Distribution */}
                    <div className="profile-card">
                        <div className="card-header">
                            <FaChartPie className="card-icon" />
                            <h2>Solved Problems Distribution</h2>
                        </div>
                        {totalSolved === 0 ? (
                            <div className="empty-chart-state">
                                <div className="empty-pie-circle">
                                    <span className="empty-text">0%</span>
                                </div>
                                <p className="empty-message">Start solving problems to see your progress!</p>
                            </div>
                        ) : (
                            <div className="chart-container">
                                <div className="pie-chart-animated">
                                    <svg viewBox="0 0 200 200" className="pie-svg">
                                        {/* Animated pie slices would go here when user has solved problems */}
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="80"
                                            fill="none"
                                            stroke="#22c55e"
                                            strokeWidth="40"
                                            strokeDasharray={`${easySlice * 5.027} 502.7`}
                                            transform="rotate(-90 100 100)"
                                            className="pie-slice easy-slice"
                                        />
                                    </svg>
                                    <div className="pie-center">
                                        <span className="pie-total">{totalSolved}</span>
                                        <span className="pie-label-small">Solved</span>
                                    </div>
                                </div>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <span className="legend-dot easy"></span>
                                        <span>Easy: {user.solved.easy}</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot medium"></span>
                                        <span>Medium: {user.solved.medium}</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot hard"></span>
                                        <span>Hard: {user.solved.hard}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Progress Overview */}
                    <div className="profile-card">
                        <div className="card-header">
                            <FaCheckCircle className="card-icon" />
                            <h2>Progress Overview</h2>
                        </div>
                        <div className="progress-list">
                            <div className="progress-item">
                                <div className="progress-header">
                                    <span className="difficulty-label">Easy</span>
                                    <span className="progress-count">{user.solved.easy} / {user.totalProblems.easy}</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-bar-fill easy"
                                            style={{ width: `${easyPercent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-header">
                                    <span className="difficulty-label">Medium</span>
                                    <span className="progress-count">{user.solved.medium} / {user.totalProblems.medium}</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-bar-fill medium"
                                            style={{ width: `${mediumPercent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-header">
                                    <span className="difficulty-label">Hard</span>
                                    <span className="progress-count">{user.solved.hard} / {user.totalProblems.hard}</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-bar-fill hard"
                                            style={{ width: `${hardPercent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Topics */}
                    <div className="profile-card">
                        <div className="card-header">
                            <FaCode className="card-icon" />
                            <h2>Top Topics</h2>
                        </div>
                        <div className="empty-state">
                            <p>No problems solved yet</p>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="profile-card">
                        <div className="card-header">
                            <FaStar className="card-icon" />
                            <h2>Achievements</h2>
                        </div>
                        <div className="empty-state">
                            <p>No badges earned yet</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
