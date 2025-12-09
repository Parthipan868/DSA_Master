# 🚀 DSA Master - Quick Deployment Cheatsheet

## ⚡ Super Quick Start (10 Commands)

```powershell
# 1. Setup MongoDB Atlas (do this manually at mongodb.com/cloud/atlas)

# 2. Build Docker Images
docker build -t parthipan868/dsa-master-backend:latest ./Backend
docker build -t parthipan868/dsa-master-frontend:latest ./Frontend

# 3. Push to DockerHub
docker login
docker push parthipan868/dsa-master-backend:latest
docker push parthipan868/dsa-master-frontend:latest

# 4. Deploy AWS Infrastructure
cd infrastructure/terraform
terraform init
terraform apply  # Note the public_ip output

# 5. Update Jenkinsfile with EC2 IP (line 11)

# 6. Setup Jenkins & Run Pipeline
```

---

## 📋 Prerequisites Checklist

```
✅ Docker Desktop installed and running
✅ AWS CLI installed (aws --version)
✅ Terraform installed (terraform --version)
✅ Git installed
✅ AWS Account created
✅ AWS CLI configured (aws configure)
✅ DockerHub account created
✅ MongoDB Atlas cluster created
✅ EC2 SSH Key created (dsa-key.pem)
```

---

## 🔑 Important Configuration

### MongoDB Atlas Connection String
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/dsa-master?retryWrites=true&w=majority
```

### Jenkinsfile Updates (Lines to Change)
```groovy
Line 7:  DOCKER_USER = 'YOUR_DOCKERHUB_USERNAME'
Line 11: EC2_HOST = 'ubuntu@YOUR_EC2_PUBLIC_IP'
```

### Environment Variables (.env)
```env
DOCKER_USER=parthipan868
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_min_32_chars
NODE_ENV=production
```

---

## 🐳 Docker Commands

### Build
```powershell
docker build -t parthipan868/dsa-master-backend:latest ./Backend
docker build -t parthipan868/dsa-master-frontend:latest ./Frontend
```

### Push
```powershell
docker login
docker push parthipan868/dsa-master-backend:latest
docker push parthipan868/dsa-master-frontend:latest
```

### Test Locally
```powershell
docker-compose -f docker-compose.prod.yml up
# Frontend: http://localhost
# Backend: http://localhost:5000
```

---

## ☁️ Terraform Commands

```powershell
cd infrastructure/terraform

terraform init          # Initialize Terraform
terraform plan          # Preview changes
terraform apply         # Create infrastructure
terraform output        # Show outputs
terraform destroy       # Delete everything (when done)
```

---

## 🔧 Jenkins Setup

### Start Jenkins
```powershell
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts
```

### Get Admin Password
```powershell
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### Required Plugins
- Docker Pipeline
- Docker
- SSH Agent
- Git

### Credentials to Add
1. **dockerhub-credentials-id** (Username/Password)
2. **ec2-ssh-key** (SSH with private key)

### Jenkins Parameters
- **MONGODB_URI** - Your MongoDB Atlas connection
- **JWT_SECRET** - Your JWT secret

---

## 🌐 EC2 Commands

### SSH to EC2
```powershell
ssh -i infrastructure/terraform/dsa-key.pem ubuntu@YOUR_EC2_IP
```

### Check Containers
```bash
docker ps                           # List running containers
docker logs dsa-master-backend-1    # Backend logs
docker logs dsa-master-frontend-1   # Frontend logs
```

### Restart Services
```bash
docker-compose restart              # Restart all
docker-compose down                 # Stop all
docker-compose up -d                # Start all
```

---

## 📱 Access URLs

After deployment:
- **Frontend**: `http://YOUR_EC2_PUBLIC_IP`
- **Backend**: `http://YOUR_EC2_PUBLIC_IP:5000`
- **Jenkins**: `http://localhost:8080`

---

## 🔄 Deployment Workflow

```
1. Make code changes
   ↓
2. Commit and push to GitHub
   git add .
   git commit -m "message"
   git push origin main
   ↓
3. Run Jenkins Pipeline
   - Go to http://localhost:8080
   - Click "Build with Parameters"
   - Verify parameters
   - Click "Build"
   ↓
4. Application automatically deployed
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Docker build fails | `docker system prune -a` then rebuild |
| Can't SSH to EC2 | Check security group port 22, verify key file |
| Container not running | `docker ps` then `docker logs CONTAINER_NAME` |
| MongoDB error | Verify connection string, check IP whitelist |
| Jenkins can't push | Re-add DockerHub credentials |
| Application 404 | Check nginx logs, verify build output |

---

## 📊 Monitoring

### Check Application Status
```bash
# SSH to EC2 then:
docker ps                               # Containers running?
docker stats                            # Resource usage
docker logs -f dsa-master-backend-1     # Follow backend logs
curl http://localhost:5000              # Test backend
curl http://localhost                   # Test frontend
```

### AWS Console Checks
- EC2 → Instances → Check status
- Security Groups → Verify rules
- CloudWatch → View metrics

---

## 💾 Backup & Recovery

### Backup MongoDB
```powershell
mongodump --uri="YOUR_ATLAS_URI" --out=./backup
```

### Save Docker Images
```powershell
docker save parthipan868/dsa-master-backend:latest > backend.tar
docker save parthipan868/dsa-master-frontend:latest > frontend.tar
```

### Backup Terraform State
```powershell
cd infrastructure/terraform
cp terraform.tfstate terraform.tfstate.backup
```

---

## 🔒 Security Checklist

```
✅ .env not committed to Git
✅ Strong MongoDB password
✅ SSH key properly secured
✅ AWS credentials not exposed
✅ Jenkins secured with strong password
✅ Security group rules reviewed
✅ HTTPS configured (optional but recommended)
```

---

## 📁 Important Files

```
Jenkinsfile                        - CI/CD pipeline definition
docker-compose.prod.yml            - Production Docker setup
infrastructure/terraform/main.tf   - AWS infrastructure
Backend/Dockerfile                 - Backend container config
Frontend/Dockerfile                - Frontend container config
.env                              - Environment variables (DO NOT COMMIT!)
```

---

## 🎯 Deployment Checklist

**Before Running Pipeline:**
- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Docker images built and pushed
- [ ] Terraform applied successfully
- [ ] EC2 IP noted and added to Jenkinsfile
- [ ] Jenkins running and configured
- [ ] Credentials added to Jenkins
- [ ] Pipeline parameters set

**After Pipeline Runs:**
- [ ] All stages completed successfully
- [ ] Containers running on EC2
- [ ] Frontend accessible
- [ ] Backend responding
- [ ] Can login/signup
- [ ] Data persists to MongoDB

---

## 📞 Quick Help Commands

```powershell
# View all documentation
Get-ChildItem *.md

# Run automated deployment
.\deploy.ps1 -Action all

# Check tool versions
docker --version
terraform --version
aws --version
node --version

# Test connectivity
Test-NetConnection YOUR_EC2_IP -Port 80
Test-NetConnection YOUR_EC2_IP -Port 5000
```

---

## 🎓 Learning Resources

| Topic | Link |
|-------|------|
| Docker | https://docs.docker.com/get-started/ |
| Terraform | https://learn.hashicorp.com/terraform |
| Jenkins | https://www.jenkins.io/doc/tutorials/ |
| AWS EC2 | https://docs.aws.amazon.com/ec2/ |
| MongoDB Atlas | https://docs.atlas.mongodb.com/ |

---

## 🚀 Automation Script

```powershell
# Full automated deployment
.\deploy.ps1 -Action all

# Individual steps
.\deploy.ps1 -Action setup      # Check prerequisites
.\deploy.ps1 -Action build      # Build Docker images
.\deploy.ps1 -Action push       # Push to DockerHub
.\deploy.ps1 -Action terraform  # Deploy AWS infrastructure
```

---

## 💡 Pro Tips

1. **Test locally first**: Always test with `docker-compose up` before deploying
2. **Save EC2 IP**: Keep Terraform output handy
3. **Monitor costs**: Check AWS billing regularly
4. **Regular backups**: Export MongoDB weekly
5. **Update images**: Rebuild and push images after code changes
6. **Security**: Rotate keys and passwords regularly
7. **Logs**: Always check logs if something fails
8. **Documentation**: Keep this cheatsheet handy!

---

## 🎉 Success Indicators

You know deployment succeeded when:
- ✅ Jenkins pipeline shows all green checkmarks
- ✅ `docker ps` shows 2 running containers
- ✅ Frontend loads in browser
- ✅ Can create account and login
- ✅ No errors in container logs
- ✅ Backend API responds on port 5000

---

## 📱 Contact & Support

- **GitHub Issues**: https://github.com/Parthipan868/DSA_Master/issues
- **Documentation**: Check all .md files in project root
- **Workflow**: Run `/aws-ec2-deployment` command

---

**Keep this cheatsheet handy during deployment! 📋**

*Last Updated: December 2025*
