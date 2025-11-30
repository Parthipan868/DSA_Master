# DevOps Implementation Guide

This project has been equipped with a full DevOps stack including Docker, Kubernetes (EKS), Terraform, Helm, and Jenkins.

## 1. Docker

Dockerfiles have been created for both Frontend and Backend.

- **Frontend**: Multi-stage build (Node.js build -> Nginx serve).
- **Backend**: Node.js runtime.

### Build and Run Locally
```bash
# Frontend
cd Frontend
docker build -t dsa-frontend .
docker run -p 80:80 dsa-frontend

# Backend
cd Backend
docker build -t dsa-backend .
docker run -p 5000:5000 dsa-backend
```

## 2. Infrastructure as Code (Terraform)

Terraform is used to provision an AWS EKS cluster.

**Location**: `infrastructure/terraform/`

### Prerequisites
- AWS CLI configured
- Terraform installed

### Usage
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```
*Note: This will create resources on AWS which may incur costs.*

## 3. Kubernetes & Helm

A Helm chart is provided to deploy the application to Kubernetes.

**Location**: `infrastructure/helm/dsa-master/`

### Usage
```bash
# Install/Upgrade
helm upgrade --install dsa-master ./infrastructure/helm/dsa-master
```

## 4. Jenkins CI/CD

A `Jenkinsfile` is included in the root directory.

### Pipeline Stages
1. **Checkout**: Pulls code from GitHub.
2. **Build**: Builds Docker images for Frontend and Backend.
3. **Push**: Pushes images to DockerHub.
4. **Deploy**: Deploys to EKS using Helm.

### Jenkins Setup
1. Install Jenkins.
2. Install Docker, Kubernetes CLI, and Helm plugins.
3. Configure Credentials:
   - `dockerhub-credentials-id`: Username/Password for DockerHub.
   - `kubeconfig-id`: Kubeconfig file for EKS access.
