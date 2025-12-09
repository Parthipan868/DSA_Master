# 🚀 DSA Master - Quick Deployment Setup Guide

## 📌 Quick Start Checklist

Before you begin the deployment, complete these prerequisites:

### ✅ Prerequisites Checklist

- [ ] **MongoDB Atlas Setup**
  - [ ] Created free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [ ] Created database user with password
  - [ ] Whitelisted IP 0.0.0.0/0
  - [ ] Copied connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dsa-master`)

- [ ] **DockerHub Account**
  - [ ] Created account at [DockerHub](https://hub.docker.com)
  - [ ] Noted username for later configuration

- [ ] **AWS Account**
  - [ ] Created AWS account
  - [ ] Generated AWS Access Key ID and Secret Access Key
  - [ ] Configured AWS CLI with `aws configure`

- [ ] **Local Tools Installed**
  - [ ] Docker Desktop
  - [ ] Terraform
  - [ ] AWS CLI
  - [ ] Git

---

## 🔧 Step-by-Step Configuration

### Step 1: Update Your Credentials

#### 1.1 Update Jenkinsfile
Edit `Jenkinsfile` and update:
```groovy
// Line 7: Replace with your DockerHub username
DOCKER_USER = 'YOUR_DOCKERHUB_USERNAME'

// Line 11: Replace with your EC2 IP (after running Terraform)
EC2_HOST = 'ubuntu@YOUR_EC2_PUBLIC_IP'
```

#### 1.2 Create Environment File
Create `.env` in project root:
```env
# DockerHub
DOCKER_USER=your_dockerhub_username

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa-master?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# Node Environment
NODE_ENV=production
```

**⚠️ IMPORTANT:** Never commit the `.env` file to Git!

---

## 🐳 Phase 1: Build & Test Docker Images Locally

### Build Backend
```powershell
cd Backend
docker build -t your_dockerhub_username/dsa-master-backend:latest .
```

### Build Frontend
```powershell
cd ../Frontend
docker build -t your_dockerhub_username/dsa-master-frontend:latest .
```

### Test Locally
```powershell
cd ..
docker-compose -f docker-compose.prod.yml up
```

Access:
- Frontend: http://localhost
- Backend: http://localhost:5000

### Push to DockerHub
```powershell
docker login
docker push your_dockerhub_username/dsa-master-backend:latest
docker push your_dockerhub_username/dsa-master-frontend:latest
```

---

## ☁️ Phase 2: Provision AWS Infrastructure

### Step 1: Create SSH Key Pair
1. Go to **AWS Console** → **EC2** → **Key Pairs**
2. Click **Create key pair**
3. Name: `dsa-key`
4. Type: RSA
5. Format: .pem
6. Download and save securely

### Step 2: Run Terraform
```powershell
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Create infrastructure
terraform apply

# Type 'yes' when prompted
```

### Step 3: Note the Outputs
After Terraform completes, it will output:
```
public_ip = "54.123.45.67"
ssh_command = "ssh -i dsa-key.pem ubuntu@54.123.45.67"
```

**⚠️ Save this IP address!** You'll need it for:
1. Jenkinsfile configuration (line 11)
2. Accessing your deployed application

### Step 4: Update Jenkinsfile with EC2 IP
Edit `Jenkinsfile` line 11:
```groovy
EC2_HOST = 'ubuntu@54.123.45.67'  // Use your actual IP from Terraform
```

### Step 5: Verify EC2 Instance
Wait 2-3 minutes, then SSH into your instance:
```powershell
ssh -i path/to/dsa-key.pem ubuntu@54.123.45.67
```

Check Docker is installed:
```bash
docker --version
docker-compose --version
```

Exit the SSH session:
```bash
exit
```

---

## 🔧 Phase 3: Setup Jenkins

### Option A: Local Jenkins (Recommended for beginners)

#### Start Jenkins Container
```powershell
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins `
  -v jenkins_home:/var/jenkins_home `
  jenkins/jenkins:lts
```

#### Get Admin Password
```powershell
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

#### Configure Jenkins
1. Open http://localhost:8080
2. Paste admin password
3. Install suggested plugins
4. Create admin user

#### Install Required Plugins
1. **Manage Jenkins** → **Manage Plugins** → **Available**
2. Search and install:
   - Docker Pipeline
   - Docker
   - SSH Agent
   - Git
3. Click **Install without restart**
4. Restart Jenkins when done

#### Add Credentials

##### Add DockerHub Credentials
1. **Manage Jenkins** → **Manage Credentials** → **Global** → **Add Credentials**
2. Kind: **Username with password**
3. Username: Your DockerHub username
4. Password: Your DockerHub password
5. ID: `dockerhub-credentials-id` (exactly this!)
6. Description: DockerHub Credentials
7. Click **OK**

##### Add EC2 SSH Key
1. **Manage Jenkins** → **Manage Credentials** → **Global** → **Add Credentials**
2. Kind: **SSH Username with private key**
3. ID: `ec2-ssh-key` (exactly this!)
4. Username: `ubuntu`
5. Private Key: Click **Enter directly**
6. Open your `dsa-key.pem` file in notepad
7. Copy ENTIRE contents (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)
8. Paste into Jenkins
9. Click **OK**

---

## 🔄 Phase 4: Create Jenkins Pipeline

### Create New Pipeline Job
1. **Jenkins Dashboard** → **New Item**
2. Name: `DSA-Master-Pipeline`
3. Type: **Pipeline**
4. Click **OK**

### Configure Pipeline
1. Scroll to **Pipeline** section
2. Definition: **Pipeline script from SCM**
3. SCM: **Git**
4. Repository URL: `https://github.com/Parthipan868/DSA_Master`
5. Branch: `*/main`
6. Script Path: `Jenkinsfile`
7. Click **Save**

### Add Environment Variables
1. Go to your pipeline → **Configure**
2. Check **This project is parameterized**
3. Click **Add Parameter** → **String Parameter**
4. Name: `MONGODB_URI`
   - Default Value: Your MongoDB Atlas connection string
5. Click **Add Parameter** → **String Parameter**
6. Name: `JWT_SECRET`
   - Default Value: Your JWT secret
7. Click **Save**

---

## 🚀 Phase 5: Deploy!

### Run the Pipeline
1. Go to your pipeline **DSA-Master-Pipeline**
2. Click **Build with Parameters**
3. Verify MONGODB_URI and JWT_SECRET are correct
4. Click **Build**

### Monitor Deployment
Watch the console output:
- ✅ Checkout
- ✅ Build Backend
- ✅ Build Frontend
- ✅ Push Images
- ✅ Deploy to EC2
- ✅ Health Check

### Access Your Application
After successful deployment:
- **Frontend**: `http://YOUR_EC2_PUBLIC_IP`
- **Backend API**: `http://YOUR_EC2_PUBLIC_IP:5000`

---

## 🎯 Verify Deployment

### Check Application Status
```powershell
# SSH into EC2
ssh -i path/to/dsa-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Check running containers
docker ps

# Should see:
# - dsa-master-frontend-1
# - dsa-master-backend-1
```

### Check Logs
```bash
# Backend logs
docker logs dsa-master-backend-1

# Frontend logs
docker logs dsa-master-frontend-1
```

### Test the Application
1. Open `http://YOUR_EC2_PUBLIC_IP` in browser
2. Try to Sign Up → Create account
3. Try to Login → Verify authentication works
4. Navigate through the application

---

## 🔄 Update Application (CI/CD)

When you make code changes:

1. Commit and push to GitHub:
```powershell
git add .
git commit -m "Your changes"
git push origin main
```

2. Run Jenkins pipeline again:
   - Go to Jenkins → DSA-Master-Pipeline
   - Click **Build Now**

3. Jenkins will automatically:
   - Pull latest code
   - Build new Docker images
   - Push to DockerHub
   - Deploy to EC2

---

## 🐛 Common Issues & Solutions

### Issue: Can't SSH to EC2
**Solution:**
- Verify security group allows port 22 from your IP
- Check key file permissions
- Ensure using correct IP address

### Issue: Docker images fail to build
**Solution:**
- Check Dockerfile syntax
- Verify package.json exists
- Ensure Docker Desktop is running

### Issue: Jenkins can't connect to DockerHub
**Solution:**
- Verify credentials ID is exactly `dockerhub-credentials-id`
- Re-add DockerHub credentials
- Check username/password are correct

### Issue: Application not accessible on EC2
**Solution:**
```bash
# SSH to EC2 and check:
docker ps  # Are containers running?
docker logs dsa-master-backend-1  # Check for errors
docker logs dsa-master-frontend-1  # Check for errors

# Restart containers if needed
docker-compose restart
```

### Issue: MongoDB connection error
**Solution:**
- Verify MongoDB Atlas connection string is correct
- Check IP whitelist includes 0.0.0.0/0
- Verify database user credentials
- Test connection string locally first

---

## 🔒 Security Best Practices

### After Initial Deployment:

1. **Restrict SSH Access**
   - AWS Console → EC2 → Security Groups
   - Edit `dsa-master-sg`
   - Change SSH rule from 0.0.0.0/0 to your IP only

2. **Use Environment Variables**
   - Never hardcode secrets
   - Use Jenkins parameters for sensitive data

3. **Keep SSH Key Secure**
   - Never commit .pem file to Git
   - Store in secure location
   - Restrict file permissions

4. **Regular Updates**
   - Update dependencies regularly
   - Keep Docker images updated
   - Apply EC2 security patches

---

## 📊 Cost Estimation (AWS Free Tier)

- **EC2 t2.micro**: Free for first 12 months (750 hours/month)
- **Data Transfer**: 15 GB outbound free per month
- **MongoDB Atlas**: Free M0 cluster (512MB storage)
- **DockerHub**: Free (1 private repo)

**Estimated cost after free tier**: ~$10-15/month

---

## 🎓 What You've Learned

✅ Docker containerization
✅ Multi-stage Docker builds
✅ Docker Compose for orchestration
✅ CI/CD with Jenkins
✅ Infrastructure as Code with Terraform
✅ AWS EC2 deployment
✅ MongoDB Atlas cloud database
✅ Security group configuration
✅ SSH key management
✅ Automated deployment pipelines

**Congratulations! You've deployed a full-stack MERN application using DevOps best practices! 🎉**

---

## 📞 Quick Reference Commands

### Terraform
```powershell
cd infrastructure/terraform
terraform init          # Initialize
terraform plan          # Preview
terraform apply         # Create
terraform destroy       # Delete (when done)
```

### Docker
```powershell
docker build -t image:tag .     # Build image
docker push username/image:tag  # Push to DockerHub
docker ps                       # List containers
docker logs container_name      # View logs
```

### EC2
```powershell
ssh -i dsa-key.pem ubuntu@EC2_IP    # Connect
docker ps                            # Check containers
docker-compose restart               # Restart services
docker logs -f container_name        # Follow logs
```

### Jenkins
- http://localhost:8080 - Local Jenkins
- Build Now - Deploy application
- Console Output - View deployment logs

---

## 🚀 Next Steps

1. **Add Custom Domain**
   - Buy domain from Route 53 or GoDaddy
   - Point A record to EC2 IP
   - Update frontend API URLs

2. **Setup SSL Certificate**
   - Use Let's Encrypt (free)
   - Configure Nginx for HTTPS

3. **Configure Auto-Scaling**
   - Use AWS ECS or EKS
   - Set up Application Load Balancer

4. **Add Monitoring**
   - CloudWatch for logs
   - Set up alerts
   - Create dashboards

5. **Implement Backups**
   - MongoDB Atlas automatic backups
   - EC2 AMI snapshots
   - Regular database exports

**Happy Deploying! 🚀**
