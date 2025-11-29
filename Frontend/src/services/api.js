import axios from 'axios';

// Create axios instance
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Authentication API
export const authAPI = {
    // Sign up
    signup: async (userData) => {
        const response = await API.post('/auth/signup', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Login
    login: async (credentials) => {
        const response = await API.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await API.get('/auth/me');
        return response.data.user;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get stored user
    getStoredUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

// Problems API
export const problemsAPI = {
    getAllProblems: async () => {
        const response = await API.get('/problems');
        return response.data;
    },

    getProblemById: async (id) => {
        const response = await API.get(`/problems/${id}`);
        return response.data;
    },

    getProblemsByCompany: async (company) => {
        const response = await API.get(`/problems/company/${company}`);
        return response.data;
    }
};

export default API;
