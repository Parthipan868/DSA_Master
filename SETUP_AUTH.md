# Quick Setup Guide - MongoDB Authentication

## 🚀 Quick Start (5 minutes)

### Step 1: Ensure MongoDB is Running
```bash
# Check if MongoDB is running
mongosh

# If not running, start MongoDB:
# Windows: Start MongoDB service from Services
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Step 2: Update Backend .env
Edit `Backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsa-master
JWT_SECRET=my_super_secret_key_min_32_characters_long_change_this
NODE_ENV=development
```

### Step 3: Restart Backend Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
cd Backend
npm run dev
```

### Step 4: Create Frontend .env (Optional)
Create `Frontend/.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Restart Frontend
```bash
# Stop current frontend (Ctrl+C)
# Then restart:
cd Frontend
npm start
```

## ✅ Test Authentication

### 1. Sign Up
1. Navigate to: `http://localhost:3000/signup`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Create Account"
4. You should see success and redirect to home

### 2. Check MongoDB
```bash
mongosh
use dsa-master
db.users.find().pretty()
```

You should see your new user with hashed password!

### 3. Login
1. Navigate to: `http://localhost:3000/login`
2. Use the credentials you created
3. Click "Login"
4. You should be logged in!

### 4. Check Browser Storage
Open DevTools (F12) → Application → Local Storage
You should see:
- `token`: JWT token
- `user`: User object

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Error: MongoServerError: connect ECONNREFUSED
# Solution: Start MongoDB service
```

### CORS Error
```bash
# Error: CORS policy blocked
# Solution: Backend already has cors() enabled
# Make sure backend is running on port 5000
```

### 401 Unauthorized
```bash
# Error: Token is not valid
# Solution: Logout and login again
# Or clear localStorage in DevTools
```

## 📦 What Was Created

### Backend Files:
- ✅ `routes/auth.js` - Authentication routes (signup, login, me)
- ✅ `models/User.js` - User schema (already existed)
- ✅ Updated `server.js` - Added auth routes

### Frontend Files:
- ✅ `services/api.js` - API service with axios
- ✅ Updated `Login.js` - Connected to backend
- ✅ Updated `Signup.js` - Connected to backend
- ✅ Updated `Auth.css` - Added error styling

### Features Implemented:
- ✅ User registration with password hashing
- ✅ User login with JWT token
- ✅ Token storage in localStorage
- ✅ Protected routes (ready to use)
- ✅ Error handling & display
- ✅ Loading states

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Token sent in Authorization header
- Input validation on backend
- Unique email constraint

## 📊 API Endpoints

### POST /api/auth/signup
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "...",
    "problemsSolved": 0
  }
}
```

### POST /api/auth/login
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {...}
}
```

### GET /api/auth/me
```
Headers:
Authorization: Bearer eyJhbGc...

Response:
{
  "user": {...}
}
```

## 🎯 Next Steps

1. **Add Protected Routes**: Use token to protect pages
2. **Add Auth Context**: Manage auth state globally
3. **Update Profile**: Fetch real user data
4. **Add Logout**: Clear tokens properly
5. **Add Password Reset**: Forgot password flow

## 🚀 Ready for DevOps!

See `DEPLOYMENT.md` for full deployment guide including:
- Docker setup
- Kubernetes configuration
- CI/CD pipelines
- Cloud deployment options
- Security best practices
