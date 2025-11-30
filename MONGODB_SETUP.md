# MongoDB Setup Guide for DSA Master

## Option 1: MongoDB Atlas (Cloud - Recommended for Deployment)

### Steps:

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region (closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `dsaadmin` (or your choice)
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update Backend .env File**
   ```
   MONGO_URI=mongodb+srv://dsaadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/dsa-master?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_PASSWORD` with your actual password
   - `cluster0.xxxxx` with your actual cluster URL
   - `dsa-master` is the database name

---

## Option 2: Local MongoDB (For Development)

### Windows Installation:

1. **Download MongoDB Community Server**
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Download the Windows MSI installer
   - Run the installer
   - Choose "Complete" installation
   - Install MongoDB as a Service
   - Install MongoDB Compass (GUI tool)

2. **Verify Installation**
   ```powershell
   mongod --version
   ```

3. **Start MongoDB Service**
   ```powershell
   net start MongoDB
   ```

4. **Update Backend .env File**
   ```
   MONGO_URI=mongodb://localhost:27017/dsa-master
   ```

---

## Current Configuration

Your backend is configured to use the `MONGO_URI` from the `.env` file.

### Backend .env File Location:
`Backend/.env`

### Required Environment Variables:
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=your_super_secret_jwt_key_please_change_this_to_something_secure_min_32_chars
NODE_ENV=development
```

---

## Testing the Connection

1. **Start Backend Server**
   ```powershell
   cd Backend
   npm run dev
   ```

2. **Check Console Output**
   - You should see: `MongoDB Connected: <host>`
   - If you see connection errors, check your MONGO_URI

3. **Test API Endpoints**
   - Open browser: `http://localhost:5000`
   - You should see: `{"message": "Welcome to DSA Master API"}`

---

## Frontend Configuration

### Frontend .env File Location:
`Frontend/.env`

### Required Environment Variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Note:** You need to create this file manually (it's gitignored for security)

---

## Quick Setup Commands

### Copy .env files:
```powershell
# Backend
cp Backend/.env.example Backend/.env

# Frontend  
cp Frontend/.env.example Frontend/.env
```

Then edit the `.env` files with your actual values.

---

## Troubleshooting

### Connection Timeout
- Check if MongoDB service is running
- Verify IP whitelist in MongoDB Atlas
- Check firewall settings

### Authentication Failed
- Verify username and password in connection string
- Ensure special characters in password are URL-encoded

### Database Not Created
- MongoDB creates databases automatically on first write
- Run the seed script to populate initial data

---

## Next Steps

After MongoDB is connected:

1. **Seed the Database** (optional)
   ```powershell
   cd Backend
   node seedProblems.js
   ```

2. **Test Signup/Login**
   - Go to `http://localhost:3000/signup`
   - Create a new account
   - Check MongoDB to see the user created

3. **Verify in MongoDB Compass**
   - Connect to your database
   - Check `dsa-master` database
   - See `users` collection
