# 🔐 Authentication Setup - Complete Guide

## ✅ What's Already Done

Your DSA Master application has a complete authentication system:

### Backend (Node.js + Express + MongoDB)
- ✅ User model with password hashing (bcrypt)
- ✅ JWT token-based authentication
- ✅ Signup endpoint (`/api/auth/signup`)
- ✅ Login endpoint (`/api/auth/login`)
- ✅ Get current user endpoint (`/api/auth/me`)
- ✅ CORS configured for frontend communication
- ✅ Error handling and validation

### Frontend (React)
- ✅ Signup page with form validation
- ✅ Login page with form validation
- ✅ API service with axios
- ✅ Token storage in localStorage
- ✅ User data persistence

---

## 🚀 Quick Start (3 Steps)

### Step 1: Set Up MongoDB

**Choose Option A (Recommended) or Option B:**

#### **Option A: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `Backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/dsa-master?retryWrites=true&w=majority
   ```

#### **Option B: Local MongoDB**
1. Install MongoDB Community Server
2. Start service: `net start MongoDB`
3. `Backend/.env` already configured for local:
   ```
   MONGO_URI=mongodb://localhost:27017/dsa-master
   ```

📖 **Detailed instructions:** See `MONGODB_SETUP.md`

---

### Step 2: Configure Environment Files

Run the setup script:
```powershell
.\setup.ps1
```

Or manually create:

**Backend/.env** (copy from Backend/.env.example):
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=your_super_secret_jwt_key_please_change_this_to_something_secure_min_32_chars
NODE_ENV=development
```

**Frontend/.env** (copy from Frontend/.env.example):
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 3: Test the Connection

```powershell
cd Backend
npm run test-db
```

You should see:
```
✅ MongoDB Connected Successfully!
📦 Host: ...
🗄️  Database: dsa-master
```

---

## 🧪 Testing Authentication

### 1. Start Both Servers

**Terminal 1 - Backend:**
```powershell
cd Backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd Frontend
npm start
```

### 2. Test Signup

1. Open browser: `http://localhost:3000/signup`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Create Account"
4. You should be redirected to home page

### 3. Verify in MongoDB

**Using MongoDB Compass:**
1. Connect to your database
2. Navigate to `dsa-master` database
3. Open `users` collection
4. You should see your new user!

**Using MongoDB Atlas:**
1. Go to "Database" → "Browse Collections"
2. Find `dsa-master` database
3. Check `users` collection

### 4. Test Login

1. Go to `http://localhost:3000/login`
2. Enter your credentials
3. Click "Login"
4. You should be logged in!

### 5. Check Browser Console

Open DevTools (F12) → Console:
- You should see: `Login successful: {token: "...", user: {...}}`
- Check Application → Local Storage → `http://localhost:3000`
- You should see `token` and `user` stored

---

## 🔍 Debugging

### Backend Not Connecting to MongoDB?

Run the test script:
```powershell
cd Backend
npm run test-db
```

Common issues:
- ❌ MONGO_URI not set → Check Backend/.env
- ❌ MongoDB service not running → `net start MongoDB`
- ❌ Wrong credentials → Verify username/password
- ❌ IP not whitelisted → Add 0.0.0.0/0 in Atlas

### Frontend Can't Reach Backend?

Check:
1. Backend server is running on port 5000
2. Frontend .env has correct API URL
3. CORS is configured (already done in server.js)
4. Check browser console for errors

### Signup/Login Not Working?

**Check Backend Console:**
- Look for error messages
- Verify MongoDB connection
- Check request logs

**Check Frontend Console:**
- Look for API errors
- Check network tab for failed requests
- Verify form data is being sent

**Common Errors:**

| Error | Solution |
|-------|----------|
| "User already exists" | Email is already registered |
| "Invalid credentials" | Wrong email/password |
| "Network Error" | Backend not running or CORS issue |
| "Passwords do not match" | Confirm password doesn't match |
| "Password must be at least 6 characters" | Use longer password |

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "...",
    "problemsSolved": 0
  }
}
```

#### 2. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### 3. Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "...",
    "problemsSolved": 0
  }
}
```

---

## 🧪 Testing with cURL

### Signup
```powershell
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}'
```

### Login
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"test123\"}'
```

---

## 🔒 Security Features

✅ **Password Hashing**: Passwords are hashed with bcrypt (salt rounds: 10)
✅ **JWT Tokens**: Secure token-based authentication (7-day expiry)
✅ **Input Validation**: Email format, password length, required fields
✅ **CORS Protection**: Only allowed origins can access API
✅ **Error Handling**: Sensitive info not exposed in production

---

## 📦 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  avatar: String (default: random avatar),
  problemsSolved: Number (default: 0),
  createdAt: Date (auto-generated)
}
```

---

## 🎯 Next Steps

After authentication is working:

1. **Seed Sample Data**
   ```powershell
   cd Backend
   npm run seed
   ```

2. **Implement Protected Routes**
   - Add authentication middleware
   - Protect problem submission endpoints
   - Track user progress

3. **Add Features**
   - Password reset
   - Email verification
   - Social login (Google, GitHub)
   - User profile page
   - Avatar upload

4. **Prepare for Deployment**
   - Environment variables for production
   - MongoDB Atlas for production database
   - JWT secret rotation
   - Rate limiting
   - HTTPS enforcement

---

## 📚 File Structure

```
DSA Master/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── User.js               # User schema
│   ├── routes/
│   │   └── auth.js               # Auth endpoints
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   ├── server.js                 # Express server
│   ├── testConnection.js         # DB test script
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Signup.js         # Signup page
│   │   │   └── Auth.css          # Auth styles
│   │   ├── services/
│   │   │   └── api.js            # API service
│   │   └── App.js                # Main app
│   ├── .env                      # Frontend env
│   └── .env.example
│
├── MONGODB_SETUP.md              # MongoDB setup guide
├── AUTH_SETUP.md                 # This file
└── setup.ps1                     # Setup script
```

---

## ✅ Checklist

Before moving to deployment, ensure:

- [ ] MongoDB is connected (run `npm run test-db`)
- [ ] Backend server starts without errors
- [ ] Frontend can reach backend API
- [ ] Signup creates user in database
- [ ] Login returns valid token
- [ ] Token is stored in localStorage
- [ ] Protected routes work with token
- [ ] Error messages display correctly
- [ ] CORS is configured properly

---

## 🆘 Need Help?

1. Check the error messages in:
   - Backend console
   - Frontend console (F12)
   - Network tab (F12 → Network)

2. Run diagnostics:
   ```powershell
   cd Backend
   npm run test-db
   ```

3. Verify environment files:
   - Backend/.env has MONGO_URI
   - Frontend/.env has REACT_APP_API_URL

4. Common fixes:
   - Restart both servers
   - Clear browser cache/localStorage
   - Check MongoDB service is running
   - Verify firewall isn't blocking ports

---

## 🎉 Success!

Once you see users in your MongoDB database after signup, your authentication is fully working! 

You're now ready to move on to the deployment pipeline with:
- ✅ GitHub
- ✅ Jenkins
- ✅ Docker
- ✅ DockerHub
- ✅ AWS EKS (Kubernetes)
- ✅ Terraform
- ✅ Helm

Good luck! 🚀
