# DSA Master - DevOps Deployment Guide

## 🚀 Deployment Architecture

### Technology Stack
- **Frontend**: React 18 (Static Site)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT

---

## 📋 Prerequisites

### 1. **Local Development**
```bash
- Node.js >= 16.x
- MongoDB >= 5.x
- npm or yarn
```

### 2. **Production Environment**
```bash
- Docker & Docker Compose
- Kubernetes (Optional for scaling)
- CI/CD Tool (GitHub Actions, GitLab CI, or Jenkins)
- Cloud Provider (AWS, GCP, Azure, or DigitalOcean)
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsa-master
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐳 Docker Deployment

### 1. **Backend Dockerfile**
Create `Backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### 2. **Frontend Dockerfile**
Create `Frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. **Docker Compose**
Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5
    container_name: dsa-mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_DATABASE: dsa-master

  backend:
    build: ./Backend
    container_name: dsa-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongodb:27017/dsa-master
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongodb

  frontend:
    build: ./Frontend
    container_name: dsa-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

---

## ☸️ Kubernetes Deployment (Optional)

### 1. **MongoDB Deployment**
```yaml
# k8s/mongodb-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:5
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-storage
          mountPath: /data/db
      volumes:
      - name: mongo-storage
        persistentVolumeClaim:
          claimName: mongo-pvc
```

### 2. **Backend Deployment**
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dsa-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dsa-backend
  template:
    metadata:
      labels:
        app: dsa-backend
    spec:
      containers:
      - name: backend
        image: your-registry/dsa-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: MONGO_URI
          valueFrom:
            secretKeyRef:
              name: dsa-secrets
              key: mongo-uri
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: dsa-secrets
              key: jwt-secret
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy DSA Master

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install Backend Dependencies
      working-directory: ./Backend
      run: npm ci
    
    - name: Install Frontend Dependencies
      working-directory: ./Frontend
      run: npm ci
    
    - name: Build Frontend
      working-directory: ./Frontend
      run: npm run build
    
    - name: Deploy to Server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/dsa-master
          git pull origin main
          docker-compose down
          docker-compose up -d --build
```

---

## 🌍 Cloud Deployment Options

### Option 1: **AWS (Recommended)**
- **Frontend**: S3 + CloudFront
- **Backend**: EC2 / ECS / Elastic Beanstalk
- **Database**: MongoDB Atlas / DocumentDB
- **Load Balancer**: Application Load Balancer
- **SSL**: AWS Certificate Manager

### Option 2: **Vercel + Railway**
- **Frontend**: Vercel (Free tier)
- **Backend**: Railway.app
- **Database**: MongoDB Atlas (Free tier)

### Option 3: **DigitalOcean**
- **Droplet**: $6/month
- **App Platform**: Managed deployment
- **Database**: MongoDB Atlas

### Option 4: **Heroku**
- **Web Dyno**: Backend
- **Static Site**: Frontend
- **MongoDB Atlas**: Database

---

## 📦 Deployment Steps

### 1. **Using Docker Compose (Easiest)**
```bash
# Clone repository
git clone <your-repo>
cd DSA-Master

# Create .env file
cp Backend/.env.example Backend/.env
# Edit Backend/.env with your values

# Build and run
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Access application
# Frontend: http://localhost
# Backend: http://localhost:5000
```

### 2. **Manual Deployment**
```bash
# Backend
cd Backend
npm install
npm run dev

# Frontend
cd Frontend
npm install
npm start
```

---

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET (minimum 32 characters)
- [ ] Enable HTTPS/SSL in production
- [ ] Set up CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Implement input validation
- [ ] Use helmet.js for security headers
- [ ] Enable CSP (Content Security Policy)
- [ ] Regular security updates

---

## 📊 Monitoring & Logging

### Recommended Tools:
1. **Application Monitoring**: PM2, New Relic, or Datadog
2. **Error Tracking**: Sentry
3. **Logging**: Winston + CloudWatch/Loggly
4. **Uptime Monitoring**: UptimeRobot, Pingdom
5. **Performance**: Google Lighthouse, WebPageTest

---

## 🔄 Scaling Strategy

### Horizontal Scaling:
- Use load balancer (Nginx/AWS ALB)
- Deploy multiple backend instances
- Use Redis for session management
- CDN for static assets

### Database Scaling:
- MongoDB replica sets
- Read replicas
- Sharding for large datasets

---

## 📝 Maintenance

### Regular Tasks:
- Database backups (Daily)
- Security updates (Weekly)
- Log rotation
- Performance monitoring
- SSL certificate renewal

---

## 🚨 Rollback Strategy

```bash
# Using Docker
docker-compose down
git checkout <previous-commit>
docker-compose up -d --build

# Using PM2
pm2 reload all
```

---

## 💰 Estimated Costs (Monthly)

### Option 1: AWS
- EC2 t3.small: $15/month
- MongoDB Atlas M0: Free
- S3 + CloudFront: $5/month
- **Total**: ~$20/month

### Option 2: Vercel + Railway
- Vercel: Free
- Railway: $5/month
- MongoDB Atlas: Free
- **Total**: ~$5/month

### Option 3: DigitalOcean
- Droplet (2GB): $12/month
- MongoDB Atlas: Free
- **Total**: ~$12/month

---

## 📞 Support & Documentation

- Store deployment notes in `/docs`
- Document API endpoints
- Create runbooks for common issues
- Set up alerts for critical failures
