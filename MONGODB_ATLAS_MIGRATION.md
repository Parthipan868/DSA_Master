# 🗄️ MongoDB Migration Guide: Compass to Atlas

## Overview
This guide will help you migrate your local MongoDB data from Compass to MongoDB Atlas (cloud).

---

## 📋 Prerequisites

- MongoDB Compass installed (you already have this)
- MongoDB Atlas account (create at https://www.mongodb.com/cloud/atlas)
- Your local MongoDB running with DSA Master data

---

## Step 1: Setup MongoDB Atlas

### 1.1 Create Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Try Free**
3. Sign up with Google/GitHub or email
4. Verify your email

### 1.2 Create a Cluster
1. Choose **FREE** shared cluster (M0)
2. Cloud Provider: **AWS**
3. Region: **N. Virginia (us-east-1)** (or closest to you)
4. Cluster Name: `DSA-Master-Cluster`
5. Click **Create Cluster** (takes 3-5 minutes)

### 1.3 Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Authentication Method: **Password**
4. Username: `dsamaster` (or your choice)
5. Password: Generate a secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 1.4 Whitelist Your IP
1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ For production, restrict this to specific IPs
4. Click **Confirm**

### 1.5 Get Connection String
1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string, it looks like:
```
mongodb+srv://dsamaster:<password>@dsa-master-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **Replace `<password>` with your actual password**
8. **Add database name** at the end:
```
mongodb+srv://dsamaster:YOUR_PASSWORD@dsa-master-cluster.xxxxx.mongodb.net/dsa-master?retryWrites=true&w=majority
```

9. **Save this connection string!** You'll need it for deployment.

---

## Step 2: Export Data from Local MongoDB (Compass)

### Option A: Using MongoDB Compass GUI

1. Open **MongoDB Compass**
2. Connect to your local database: `mongodb://localhost:27017`
3. Select database: `dsa-master`

For each collection (users, problems, submissions, etc.):
1. Click on the collection
2. Click **Collection** menu → **Export Collection**
3. Export format: **JSON**
4. Save to a known location (e.g., `C:\Temp\mongodb-export\`)
5. Repeat for all collections

### Option B: Using mongodump (Command Line)

```powershell
# Navigate to a directory to store the export
cd C:\Temp

# Export entire database
mongodump --db=dsa-master --out=./mongodb-export

# This creates a folder structure:
# mongodb-export/
#   dsa-master/
#     users.bson
#     problems.bson
#     submissions.bson
#     etc.
```

---

## Step 3: Import Data to MongoDB Atlas

### Option A: Using MongoDB Compass (Recommended)

1. Open **MongoDB Compass**
2. Click **New Connection**
3. Paste your Atlas connection string:
```
mongodb+srv://dsamaster:YOUR_PASSWORD@dsa-master-cluster.xxxxx.mongodb.net/dsa-master
```
4. Click **Connect**

5. You should see your cluster connected
6. Create database if it doesn't exist:
   - Click **Create Database**
   - Database Name: `dsa-master`
   - Collection Name: `users` (start with one)

For each collection:
1. Select the collection (or create it)
2. Click **Collection** menu → **Import Data**
3. Select your exported JSON file
4. Click **Import**
5. Repeat for all collections

### Option B: Using mongorestore (Command Line)

```powershell
# If you used mongodump before, restore with mongorestore
mongorestore --uri="mongodb+srv://dsamaster:YOUR_PASSWORD@dsa-master-cluster.xxxxx.mongodb.net/dsa-master" --dir=./mongodb-export/dsa-master
```

---

## Step 4: Verify Migration

### 4.1 Check Data in Atlas
1. In MongoDB Compass, connected to Atlas
2. Browse through each collection
3. Verify document counts match local database
4. Spot check some documents

### 4.2 Test Connection from Application

Update your Backend `.env` file:
```env
MONGODB_URI=mongodb+srv://dsamaster:YOUR_PASSWORD@dsa-master-cluster.xxxxx.mongodb.net/dsa-master?retryWrites=true&w=majority
```

Test locally:
```powershell
cd Backend
node testConnection.js
```

You should see:
```
MongoDB Connected: dsa-master-cluster-shard-00-00.xxxxx.mongodb.net
```

---

## Step 5: Update Application Configuration

### 5.1 Update Backend .env
```env
# Local development
MONGODB_URI=mongodb+srv://dsamaster:YOUR_PASSWORD@dsa-master-cluster.xxxxx.mongodb.net/dsa-master?retryWrites=true&w=majority
```

### 5.2 For Production (Jenkins)
When setting up Jenkins parameters, use this same connection string for `MONGODB_URI`.

---

## 🔒 Security Best Practices

### 1. Connection String Security
- ❌ Never commit connection strings to Git
- ✅ Always use environment variables
- ✅ Add `.env` to `.gitignore`

### 2. Database User Permissions
- Create separate users for different environments
- Production user: read/write only to specific database
- Development user: can be more permissive

### 3. Network Access
For production:
1. Go to Atlas → Network Access
2. Remove 0.0.0.0/0 (allow all)
3. Add specific IPs:
   - Your EC2 instance public IP
   - Your Jenkins server IP
   - Your home/office IP (for management)

### 4. Enable Monitoring
1. Atlas dashboard shows:
   - Connections
   - Operations per second
   - Network traffic
   - Storage usage
2. Set up alerts for unusual activity

---

## 📊 Comparison: Local vs Atlas

| Feature | Local (Compass) | MongoDB Atlas |
|---------|----------------|---------------|
| **Setup** | Simple | 5-10 minutes |
| **Cost** | Free | Free (M0 tier) |
| **Accessibility** | Local only | Anywhere with internet |
| **Backup** | Manual | Automatic |
| **Scaling** | Limited | Easy scaling |
| **Security** | Local network | Cloud-level security |
| **Monitoring** | Limited | Built-in dashboards |
| **Production Ready** | ❌ No | ✅ Yes |

---

## 🐛 Troubleshooting

### Issue: Can't connect to Atlas
**Solution:**
- Verify connection string is correct
- Check password has no special characters (or URL encode them)
- Verify IP is whitelisted (0.0.0.0/0)
- Check cluster is active (not paused)

### Issue: Import failed
**Solution:**
- Check JSON format is valid
- Verify collection exists
- Try importing smaller batches
- Check Atlas storage limits (512MB for M0)

### Issue: Application can't connect
**Solution:**
- Verify `MONGODB_URI` environment variable is set
- Check `.env` file is loaded correctly
- Test connection with `testConnection.js`
- Check Atlas network access allows your IP

### Issue: Slow performance
**Solution:**
- Atlas M0 (free tier) has limited performance
- Consider upgrading to M10 for production
- Check your queries have proper indexes
- Review Atlas performance metrics

---

## 📝 Migration Checklist

Before going live with Atlas:

- [ ] Atlas cluster created and running
- [ ] Database user created with strong password
- [ ] Network access configured (0.0.0.0/0 for testing)
- [ ] Connection string obtained and saved
- [ ] All collections exported from local MongoDB
- [ ] All collections imported to Atlas
- [ ] Document counts verified
- [ ] Test connection from application successful
- [ ] `.env` updated with Atlas connection string
- [ ] Application runs locally with Atlas
- [ ] No errors in application logs
- [ ] Connection string added to Jenkins parameters
- [ ] `.gitignore` includes `.env` files

---

## 💡 Alternative: Start Fresh (No Migration)

If you don't have important data to migrate:

1. Use your Atlas connection string in `.env`
2. Run your seed scripts to populate data:
```powershell
cd Backend
node seedProblems.js
```
3. Create test users through the application
4. This is cleaner for initial deployment

---

## 🔄 Ongoing Maintenance

### Daily Backups
Atlas M0 (free tier):
- Basic automatic backups
- For M10+: Configure custom backup schedule

### Manual Backup
```powershell
# Export from Atlas periodically
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/dsa-master" --out=./backup-$(date +%Y%m%d)
```

### Monitor Usage
1. Atlas Dashboard → Metrics
2. Watch for:
   - Storage approaching 512MB limit (M0)
   - High connection counts
   - Slow queries
   - Error rates

---

## 🎓 Next Steps

After migration:
1. ✅ Test all application features with Atlas
2. ✅ Update documentation with new connection details
3. ✅ Set up monitoring alerts in Atlas
4. ✅ Configure automated backups
5. ✅ Plan for scaling (upgrade tier if needed)

**Congratulations! Your database is now cloud-ready! ☁️**

---

## 📞 Quick Reference

### Atlas Dashboard
https://cloud.mongodb.com

### Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.xxxxx.mongodb.net/DATABASE?retryWrites=true&w=majority
```

### Common Commands
```powershell
# Export from local
mongodump --db=dsa-master --out=./export

# Import to Atlas
mongorestore --uri="CONNECTION_STRING" --dir=./export/dsa-master

# Test connection
node Backend/testConnection.js
```

### Support
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Community Forums: https://www.mongodb.com/community/forums
- Support: https://support.mongodb.com

---

**Ready for production deployment! 🚀**
