---
description: Deploy DSA Master to AWS EC2 using DevOps Pipeline
---

# 🚀 DSA Master - AWS EC2 DevOps Deployment Workflow

## Overview
Deploy your MERN stack application to AWS EC2 using:
- **GitHub** - Source control
- **Docker** - Containerization
- **DockerHub** - Image registry
- **Jenkins** - CI/CD automation
- **Terraform** - Infrastructure as Code
- **AWS EC2** - Production server
- **MongoDB Atlas** - Cloud database

---

## ⚠️ Prerequisites

### 1. MongoDB Atlas Setup (Replace Local Compass)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IPs (0.0.0.0/0) for testing
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dsa-master`)
6. Keep this connection string handy - you'll need it for deployment

### 2. GitHub Repository
1. Ensure your code is pushed to: `https://github.com/Parthipan868/DSA_Master`
2. Verify `.gitignore` excludes `.env` files

### 3. DockerHub Account
1. Create account at [DockerHub](https://hub.docker.com)
2. Note your username (e.g., `parthipan868`)

### 4. AWS Account
1. Create AWS account at [aws.amazon.com](https://aws.amazon.com)
2. Install AWS CLI: `choco install awscli` (or download from AWS)
3. Configure credentials: `aws configure`
   - Enter AWS Access Key ID
   - Enter AWS Secret Access Key
   - Default region: `us-east-1`
   - Default output format: `json`

### 5. Tools Installation
```powershell
# Install Terraform
choco install terraform

# Install Docker Desktop
choco install docker-desktop

# Verify installations
terraform --version
docker --version
aws --version
```

---

## 📋 Phase 1: Update Application Configuration

### Step 1: Update Backend Dockerfile for Production
Already done ✅ (using node:18-alpine)

### Step 2: Update Frontend Dockerfile for Production
Already done ✅ (multi-stage build with nginx)

### Step 3: Update docker-compose.prod.yml
Already configured ✅

### Step 4: Create Environment Configuration
Update Backend to use environment variables from `.env`

---

## 🐳 Phase 2: Build and Test Docker Images Locally

### Step 1: Build Backend Image
```powershell
cd Backend
docker build -t parthipan868/dsa-master-backend:latest .
```

### Step 2: Build Frontend Image
```powershell
cd ../Frontend
docker build -t parthipan868/dsa-master-frontend:latest .
```

### Step 3: Test Locally with Docker Compose
```powershell
# Create a .env file in root with:
# DOCKER_USER=parthipan868
# MONGODB_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=your_jwt_secret

cd ..
docker-compose -f docker-compose.prod.yml up
```

Test the application:
- Frontend: http://localhost
- Backend: http://localhost:5000

### Step 4: Push to DockerHub
```powershell
# Login to DockerHub
docker login

# Push images
docker push parthipan868/dsa-master-backend:latest
docker push parthipan868/dsa-master-frontend:latest
```

---

## ☁️ Phase 3: Provision AWS Infrastructure with Terraform

### Step 1: Create SSH Key Pair for EC2
```powershell
# In AWS Console:
# 1. Go to EC2 → Key Pairs
# 2. Create new key pair named "dsa-key"
# 3. Download dsa-key.pem
# 4. Save it in a secure location
```

### Step 2: Update Terraform Variables
Terraform files are ready at `infrastructure/terraform/`

### Step 3: Initialize Terraform
// turbo
```powershell
cd infrastructure/terraform
terraform init
```

### Step 4: Review Terraform Plan
// turbo
```powershell
terraform plan
```

### Step 5: Apply Terraform Configuration
```powershell
# This creates your EC2 instance
terraform apply

# Type 'yes' when prompted
# Note the output: public_ip and ssh_command
```

### Step 6: Wait for EC2 Instance to be Ready
Wait 2-3 minutes for the instance to initialize and install Docker.

---

## 🔧 Phase 4: Setup Jenkins (Two Options)

### Option A: Local Jenkins (Recommended for Testing)

#### Step 1: Run Jenkins in Docker
```powershell
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins `
  -v jenkins_home:/var/jenkins_home `
  -v /var/run/docker.sock:/var/run/docker.sock `
  jenkins/jenkins:lts
```

#### Step 2: Get Initial Admin Password
```powershell
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

#### Step 3: Configure Jenkins
1. Open http://localhost:8080
2. Enter the initial admin password
3. Install suggested plugins
4. Create admin user

#### Step 4: Install Required Plugins
1. Go to: Manage Jenkins → Manage Plugins → Available
2. Install:
   - Docker Pipeline
   - Docker
   - SSH Agent
   - Git
3. Restart Jenkins

#### Step 5: Add Credentials
1. **DockerHub Credentials**:
   - Manage Jenkins → Manage Credentials → Global → Add Credentials
   - Kind: Username with password
   - ID: `dockerhub-credentials-id`
   - Username: your DockerHub username
   - Password: your DockerHub password

2. **EC2 SSH Key**:
   - Add Credentials → SSH Username with private key
   - ID: `ec2-ssh-key`
   - Username: `ubuntu`
   - Private Key: Paste contents of your `dsa-key.pem` file

### Option B: Jenkins on EC2 (Advanced)
```bash
# SSH into EC2 first, then install Jenkins
sudo apt update
sudo apt install -y openjdk-11-jdk
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

---

## 🔄 Phase 5: Create Jenkins Pipeline

### Step 1: Update Jenkinsfile
The Jenkinsfile is already in your root directory. Update line 7:
```groovy
DOCKER_USER = 'parthipan868'  // Change to your DockerHub username
```

Update line 10:
```groovy
EC2_HOST = 'ubuntu@YOUR_EC2_PUBLIC_IP'  // Use IP from terraform output
```

### Step 2: Create Pipeline Job in Jenkins
1. Jenkins Dashboard → New Item
2. Name: `DSA-Master-Pipeline`
3. Type: Pipeline
4. OK

### Step 3: Configure Pipeline
1. Scroll to "Pipeline" section
2. Definition: Pipeline script from SCM
3. SCM: Git
4. Repository URL: `https://github.com/Parthipan868/DSA_Master`
5. Branch: `*/main`
6. Script Path: `Jenkinsfile`
7. Save

### Step 4: Add Environment Variables to Jenkins
1. Pipeline → Configure → Pipeline
2. Check "This project is parameterized"
3. Add String Parameters:
   - `MONGODB_URI_SECRET` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Your JWT secret key

---

## 🚀 Phase 6: Deploy to EC2

### Step 1: Run Jenkins Pipeline
1. Click "Build Now" in your pipeline
2. Watch the console output
3. Pipeline stages:
   - ✅ Checkout code
   - ✅ Build Frontend Docker image
   - ✅ Build Backend Docker image
   - ✅ Push images to DockerHub
   - ✅ Deploy to EC2

### Step 2: Verify Deployment
```powershell
# SSH into EC2
ssh -i path/to/dsa-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Check running containers
docker ps

# Check logs
docker logs dsa-master-backend-1
docker logs dsa-master-frontend-1
```

### Step 3: Access Your Application
- Frontend: `http://YOUR_EC2_PUBLIC_IP`
- Backend API: `http://YOUR_EC2_PUBLIC_IP:5000`

---

## 🔒 Phase 7: Security & Production Readiness

### Step 1: Update Security Group (Optional - More Restrictive)
```powershell
# In AWS Console → EC2 → Security Groups
# Modify dsa-master-sg:
# - Restrict SSH (port 22) to your IP only
# - Keep ports 80 and 5000 open to 0.0.0.0/0
```

### Step 2: Set Up Domain (Optional)
1. Purchase domain (e.g., from Route 53, GoDaddy)
2. Point A record to EC2 public IP
3. Update frontend API calls to use domain

### Step 3: Add SSL Certificate (Optional)
```bash
# SSH into EC2
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com
```

---

## 📊 Phase 8: Monitoring & Maintenance

### Check Application Status
```powershell
# SSH into EC2
ssh -i dsa-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# View running containers
docker ps

# View logs
docker logs -f dsa-master-backend-1
docker logs -f dsa-master-frontend-1

# Restart services if needed
docker-compose restart
```

### Update Application
1. Push code changes to GitHub
2. Run Jenkins pipeline again
3. Jenkins will automatically build and deploy new version

---

## 🎯 Quick Command Reference

### Local Development
```powershell
# Build images
docker build -t parthipan868/dsa-master-backend:latest ./Backend
docker build -t parthipan868/dsa-master-frontend:latest ./Frontend

# Push to DockerHub
docker push parthipan868/dsa-master-backend:latest
docker push parthipan868/dsa-master-frontend:latest
```

### Terraform
```powershell
cd infrastructure/terraform
terraform init      # Initialize
terraform plan      # Preview changes
terraform apply     # Create infrastructure
terraform destroy   # Delete infrastructure (when done)
```

### EC2 Management
```powershell
# SSH into EC2
ssh -i dsa-key.pem ubuntu@EC2_IP

# Check Docker containers
docker ps

# View logs
docker logs CONTAINER_NAME

# Restart containers
docker-compose restart

# Stop all containers
docker-compose down

# Start containers
docker-compose up -d
```

---

## 🐛 Troubleshooting

### Issue: Can't connect to EC2
- Check security group allows your IP on port 22
- Verify key file permissions: `icacls dsa-key.pem /reset`
- Ensure using correct public IP

### Issue: Application not accessible
- Check EC2 instance is running
- Verify security group allows ports 80 and 5000
- Check docker containers are running: `docker ps`
- Check container logs: `docker logs CONTAINER_NAME`

### Issue: MongoDB connection failed
- Verify MongoDB Atlas connection string is correct
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify database user credentials

### Issue: Jenkins can't connect to EC2
- Verify SSH key is added to Jenkins credentials
- Check EC2 public IP is correct in Jenkinsfile
- Ensure EC2 security group allows SSH from Jenkins server IP

---

## ✅ Success Criteria

- [ ] EC2 instance created and running
- [ ] Docker images built and pushed to DockerHub
- [ ] Jenkins pipeline completes successfully
- [ ] Application accessible at EC2 public IP
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Can sign up/login successfully
- [ ] Data persists in MongoDB Atlas

---

## 💡 Next Steps After Deployment

1. **Set up CI/CD triggers**: Configure webhook for automatic deployment on git push
2. **Add monitoring**: Set up CloudWatch for EC2 metrics
3. **Configure auto-scaling**: Use ECS or EKS for production scaling
4. **Implement logging**: Set up centralized logging with CloudWatch Logs
5. **Add backup strategy**: Automated MongoDB Atlas backups
6. **Domain & SSL**: Configure custom domain with HTTPS

---

## 📞 Need Help?

Common issues and solutions are in the Troubleshooting section above.

**Happy Deploying! 🚀**
