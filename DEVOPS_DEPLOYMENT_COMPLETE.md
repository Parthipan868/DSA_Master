# 🎯 DSA Master - Complete DevOps Deployment Strategy

## 📌 Overview

This document provides a complete overview of deploying **DSA Master** (MERN Stack) to **AWS EC2** using a complete DevOps pipeline.

### Technology Stack

**Application:**
- Frontend: React.js (Port 3000 → 80 in production)
- Backend: Node.js + Express (Port 5000)
- Database: MongoDB (Compass → Atlas Cloud)

**DevOps Tools:**
- **Version Control**: GitHub
- **Containerization**: Docker + DockerHub
- **CI/CD**: Jenkins
- **Infrastructure**: Terraform (Infrastructure as Code)
- **Cloud Platform**: AWS EC2 (Ubuntu 22.04)
- **Database**: MongoDB Atlas (Cloud)

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEVELOPER                                 │
│                            ↓                                     │
│                    Code Changes                                  │
│                            ↓                                     │
│                      ┌──────────┐                               │
│                      │  GitHub  │                               │
│                      └────┬─────┘                               │
│                           │                                      │
│                    Webhook/Manual                                │
│                           ↓                                      │
│                      ┌──────────┐                               │
│                      │ Jenkins  │                               │
│                      │ Pipeline │                               │
│                      └────┬─────┘                               │
│                           │                                      │
│          ┌────────────────┼────────────────┐                   │
│          ↓                ↓                ↓                    │
│    ┌─────────┐     ┌──────────┐    ┌──────────┐              │
│    │  Build  │     │   Test   │    │ Security │              │
│    │ Images  │     │   Code   │    │  Scan    │              │
│    └─────────┘     └──────────┘    └──────────┘              │
│          ↓                                                       │
│    ┌──────────┐                                                 │
│    │DockerHub │                                                 │
│    │ Registry │                                                 │
│    └────┬─────┘                                                 │
│         │                                                        │
│         │ Pull Images                                           │
│         ↓                                                        │
│    ┌─────────────────────────────────────┐                     │
│    │         AWS EC2 Instance            │                     │
│    │  ┌──────────────┐  ┌──────────────┐│                    │
│    │  │   Frontend   │  │   Backend    ││                    │
│    │  │   (Nginx)    │  │  (Node.js)   ││                    │
│    │  │   Port 80    │  │  Port 5000   ││                    │
│    │  └──────────────┘  └───────┬──────┘│                    │
│    └────────────────────────────┼───────┘                     │
│                                  │                              │
│                                  ↓                              │
│                         ┌──────────────┐                       │
│                         │  MongoDB     │                       │
│                         │   Atlas      │                       │
│                         └──────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Complete Deployment Flow

### Phase 1: Preparation (Local Setup)
1. ✅ **MERN Stack** - Already Complete
   - Frontend running locally
   - Backend API functional
   - MongoDB with Compass
   - Authentication working

2. 🔄 **MongoDB Migration** - Required
   - Export data from local MongoDB
   - Create MongoDB Atlas cluster
   - Import data to Atlas
   - Update connection strings

3. 🐳 **Docker Configuration** - Already Done
   - Frontend Dockerfile (multi-stage with Nginx)
   - Backend Dockerfile (Node.js Alpine)
   - docker-compose.prod.yml

### Phase 2: Version Control
1. **GitHub Repository**
   - Repository: `Parthipan868/DSA_Master`
   - Jenkinsfile in root
   - .gitignore configured
   - All code pushed

### Phase 3: Containerization
1. **Build Docker Images**
   ```powershell
   docker build -t parthipan868/dsa-master-backend:latest ./Backend
   docker build -t parthipan868/dsa-master-frontend:latest ./Frontend
   ```

2. **Test Locally**
   ```powershell
   docker-compose -f docker-compose.prod.yml up
   ```

3. **Push to DockerHub**
   ```powershell
   docker login
   docker push parthipan868/dsa-master-backend:latest
   docker push parthipan868/dsa-master-frontend:latest
   ```

### Phase 4: Infrastructure Provisioning
1. **AWS Account Setup**
   - Create AWS account
   - Configure AWS CLI credentials
   - Create EC2 SSH key pair

2. **Terraform Deployment**
   ```powershell
   cd infrastructure/terraform
   terraform init
   terraform plan
   terraform apply
   ```

3. **Creates:**
   - EC2 Instance (Ubuntu 22.04, t2.micro)
   - Security Group (ports 22, 80, 443, 5000, 8080)
   - Docker & Docker Compose installed
   - 20GB storage volume

### Phase 5: CI/CD Setup (Jenkins)
1. **Jenkins Installation**
   - Run Jenkins in Docker locally OR
   - Install on separate server

2. **Jenkins Configuration**
   - Install plugins (Docker, Git, SSH)
   - Add DockerHub credentials
   - Add EC2 SSH key
   - Create pipeline job

3. **Pipeline Stages**
   - ✅ Checkout code from GitHub
   - ✅ Build Backend Docker image
   - ✅ Build Frontend Docker image
   - ✅ Push images to DockerHub
   - ✅ Deploy to EC2 via SSH
   - ✅ Health check

### Phase 6: Deployment
1. **Update Configuration**
   - Jenkinsfile: DockerHub username
   - Jenkinsfile: EC2 public IP
   - Jenkins parameters: MongoDB URI
   - Jenkins parameters: JWT secret

2. **Run Pipeline**
   - Trigger build in Jenkins
   - Monitor console output
   - Verify deployment success

3. **Application Live**
   - Frontend: `http://EC2_PUBLIC_IP`
   - Backend: `http://EC2_PUBLIC_IP:5000`

---

## 📁 Project Structure

```
DSA Master/
├── .agent/
│   └── workflows/
│       └── aws-ec2-deployment.md      # Deployment workflow
├── Backend/
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── models/                        # Mongoose models
│   ├── routes/                        # API routes
│   ├── Dockerfile                     # Backend Docker config
│   ├── .env                          # Environment variables
│   └── server.js                     # Express server
├── Frontend/
│   ├── src/                          # React components
│   ├── public/                       # Static files
│   ├── Dockerfile                    # Frontend Docker config
│   └── package.json
├── infrastructure/
│   └── terraform/
│       ├── main.tf                   # Main Terraform config
│       ├── variables.tf              # Terraform variables
│       └── outputs.tf                # Terraform outputs
├── Jenkinsfile                       # CI/CD pipeline
├── docker-compose.prod.yml           # Production compose
├── deploy.ps1                        # Automation script
├── DEPLOYMENT_SETUP.md               # Setup guide
├── MONGODB_ATLAS_MIGRATION.md        # DB migration guide
└── README.md                         # Project overview
```

---

## 🚀 Quick Start Guide

### Prerequisites Checklist
- [ ] Windows with PowerShell
- [ ] Docker Desktop installed
- [ ] AWS CLI installed
- [ ] Terraform installed
- [ ] Git installed
- [ ] AWS account created
- [ ] DockerHub account created
- [ ] MongoDB Atlas account created

### Step-by-Step Deployment

#### 1. Clone Repository
```powershell
cd "C:\Users\arunp\OneDrive\文档\Projects\DSA Master"
```

#### 2. Setup MongoDB Atlas
Follow: `MONGODB_ATLAS_MIGRATION.md`
- Create cluster
- Create database user
- Whitelist IPs
- Get connection string

#### 3. Build & Push Docker Images
```powershell
# Option A: Manual
docker build -t parthipan868/dsa-master-backend:latest ./Backend
docker build -t parthipan868/dsa-master-frontend:latest ./Frontend
docker login
docker push parthipan868/dsa-master-backend:latest
docker push parthipan868/dsa-master-frontend:latest

# Option B: Automated
.\deploy.ps1 -Action build
.\deploy.ps1 -Action push
```

#### 4. Deploy AWS Infrastructure
```powershell
# Option A: Manual
cd infrastructure/terraform
terraform init
terraform apply

# Option B: Automated
.\deploy.ps1 -Action terraform
```

#### 5. Setup Jenkins
Follow: `DEPLOYMENT_SETUP.md` Phase 4
- Run Jenkins container
- Install plugins
- Add credentials
- Create pipeline

#### 6. Update Configuration
Edit `Jenkinsfile`:
```groovy
DOCKER_USER = 'parthipan868'          // Your DockerHub username
EC2_HOST = 'ubuntu@YOUR_EC2_IP'      // From Terraform output
```

#### 7. Deploy Application
- Open Jenkins: http://localhost:8080
- Go to DSA-Master-Pipeline
- Click "Build with Parameters"
- Set MONGODB_URI and JWT_SECRET
- Click "Build"

#### 8. Access Application
- Frontend: `http://YOUR_EC2_IP`
- Backend: `http://YOUR_EC2_IP:5000`

---

## 🔧 Configuration Files

### 1. Jenkinsfile
Location: `./Jenkinsfile`
- Defines CI/CD pipeline stages
- Builds Docker images
- Pushes to DockerHub
- Deploys to EC2
- Health checks

### 2. Dockerfile (Backend)
Location: `./Backend/Dockerfile`
- Base: node:18-alpine
- Installs dependencies
- Exposes port 5000
- Starts Node.js server

### 3. Dockerfile (Frontend)
Location: `./Frontend/Dockerfile`
- Multi-stage build
- Stage 1: Build React app
- Stage 2: Serve with Nginx
- Exposes port 80

### 4. docker-compose.prod.yml
Location: `./docker-compose.prod.yml`
- Defines frontend and backend services
- Uses environment variables
- Configured for production

### 5. Terraform main.tf
Location: `./infrastructure/terraform/main.tf`
- Creates EC2 instance
- Configures security group
- Installs Docker
- Sets up user data script

---

## 🔐 Security Considerations

### Environment Variables
Never commit sensitive data:
- `.env` files in `.gitignore`
- Use Jenkins parameters for secrets
- MongoDB URI with credentials
- JWT secrets

### AWS Security
- Use IAM roles properly
- Restrict security group rules
- Rotate SSH keys regularly
- Enable CloudWatch logging

### Docker Security
- Use official base images
- Scan for vulnerabilities
- Keep images updated
- Use multi-stage builds

### MongoDB Atlas
- Strong passwords
- IP whitelisting
- Enable encryption
- Regular backups

---

## 📊 Monitoring & Maintenance

### Application Logs
```bash
# SSH to EC2
ssh -i dsa-key.pem ubuntu@EC2_IP

# View logs
docker logs dsa-master-backend-1
docker logs dsa-master-frontend-1

# Follow logs
docker logs -f dsa-master-backend-1
```

### Container Status
```bash
docker ps                    # Running containers
docker stats                 # Resource usage
docker-compose restart       # Restart services
```

### EC2 Monitoring
- AWS CloudWatch metrics
- CPU, memory, network usage
- Set up alerts

### Database Monitoring
- MongoDB Atlas dashboard
- Connection count
- Operations per second
- Storage usage

---

## 🐛 Troubleshooting Guide

### Common Issues

#### 1. Docker Build Fails
```powershell
# Check Docker is running
docker --version

# Check Dockerfile syntax
docker build -t test ./Backend

# Clear Docker cache
docker system prune -a
```

#### 2. Can't Connect to EC2
```powershell
# Check security group
# Verify key permissions
# Test connection
ssh -i dsa-key.pem ubuntu@EC2_IP
```

#### 3. Application Not Loading
```bash
# Check containers are running
docker ps

# Check logs for errors
docker logs dsa-master-backend-1

# Restart services
docker-compose restart
```

#### 4. MongoDB Connection Error
- Verify connection string
- Check IP whitelist
- Test with MongoDB Compass
- Verify user credentials

---

## 💰 Cost Estimation

### AWS Free Tier (First 12 Months)
- EC2 t2.micro: 750 hours/month (FREE)
- Data Transfer: 15 GB/month (FREE)
- Storage: 30 GB EBS (FREE)

### MongoDB Atlas
- M0 Cluster: FREE (512 MB storage)

### DockerHub
- Free tier: 1 private repo

### After Free Tier
- EC2 t2.micro: ~$8-10/month
- Total: ~$10-15/month

---

## 🎓 Learning Outcomes

By completing this deployment, you've learned:

✅ **DevOps Practices**
- CI/CD pipeline implementation
- Infrastructure as Code (IaC)
- Automated deployments

✅ **Docker Skills**
- Containerization
- Multi-stage builds
- Docker Compose orchestration

✅ **Cloud Computing**
- AWS EC2 provisioning
- Security groups
- SSH key management

✅ **Tools & Technologies**
- Jenkins pipelines
- Terraform
- GitHub integration
- MongoDB Atlas

---

## 📚 Documentation Resources

### Project Documentation
- `/aws-ec2-deployment` - Workflow guide
- `DEPLOYMENT_SETUP.md` - Setup instructions
- `MONGODB_ATLAS_MIGRATION.md` - DB migration
- `README.md` - Project overview

### External Resources
- [Docker Documentation](https://docs.docker.com)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)

---

## 🔄 CI/CD Workflow

```
1. Developer commits code
   ↓
2. Pushes to GitHub
   ↓
3. Jenkins detects change (webhook/manual)
   ↓
4. Jenkins Pipeline Stages:
   a. Checkout code
   b. Build Docker images
   c. Run tests
   d. Push to DockerHub
   e. Deploy to EC2
   f. Health checks
   ↓
5. Application updated and live
   ↓
6. Monitoring & Logs
```

---

## 🎯 Success Criteria

Your deployment is successful when:

- [ ] EC2 instance running on AWS
- [ ] Docker containers running on EC2
- [ ] Frontend accessible via browser
- [ ] Backend API responding
- [ ] MongoDB Atlas connected
- [ ] User authentication working
- [ ] Data persisting correctly
- [ ] Jenkins pipeline completes successfully
- [ ] No errors in application logs

---

## 🚀 Next Steps

After successful deployment:

1. **Domain & SSL**
   - Register custom domain
   - Configure Route 53
   - Setup SSL with Let's Encrypt

2. **Monitoring**
   - CloudWatch dashboards
   - Application monitoring
   - Error tracking

3. **Scaling**
   - Application Load Balancer
   - Auto-scaling groups
   - Multi-AZ deployment

4. **Advanced DevOps**
   - Blue-Green deployments
   - Canary releases
   - Kubernetes migration

---

## 📞 Support

### Quick Commands Reference
```powershell
# Build and deployment
.\deploy.ps1 -Action all

# Just build images
.\deploy.ps1 -Action build

# Just push images
.\deploy.ps1 -Action push

# Deploy infrastructure
.\deploy.ps1 -Action terraform

# Manual Docker commands
docker build -t username/image:tag .
docker push username/image:tag
docker-compose up -d

# SSH to EC2
ssh -i dsa-key.pem ubuntu@EC2_IP

# Terraform commands
terraform init
terraform plan
terraform apply
terraform destroy
```

---

## ✨ Summary

**DSA Master** is now deployed to AWS EC2 using a complete DevOps pipeline:

- ✅ Automated CI/CD with Jenkins
- ✅ Containerized with Docker
- ✅ Infrastructure as Code with Terraform
- ✅ Cloud database with MongoDB Atlas
- ✅ Scalable architecture
- ✅ Production-ready deployment

**Congratulations on completing a full DevOps deployment! 🎉**

---

*Last Updated: December 2025*
*Project: DSA Master*
*Author: Parthipan M (parthipan868)*
