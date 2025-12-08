# DevOps Implementation Guide (EC2 Edition)

This project uses a streamlined DevOps stack: Docker, AWS EC2, Terraform, and Jenkins.

## 1. Infrastructure (Terraform)

We use Terraform to provision a free-tier eligible EC2 instance (`t2.micro`) with Docker installed.

**Location**: `infrastructure/terraform/`

### Setup
1.  **Create Key Pair**: Go to AWS Console -> EC2 -> Key Pairs -> Create Key Pair. Name it `dsa-key` and download the `.pem` file.
2.  **Run Terraform**:
    ```bash
    cd infrastructure/terraform
    terraform init
    terraform apply
    ```
3.  **Note the Output**: Terraform will show you the `public_ip` of your new server.

## 2. Docker

Dockerfiles are in `Frontend/` and `Backend/`.
A `docker-compose.prod.yml` is used to orchestrate them on the server.

## 3. Jenkins CI/CD

The `Jenkinsfile` automates the deployment.

### Jenkins Setup
1.  **Plugins**: Install "Docker Pipeline" and "SSH Agent" plugins.
2.  **Credentials**:
    -   `dockerhub-credentials-id`: Username/Password for DockerHub.
    -   `ec2-ssh-key`: **SSH Username with private key**.
        -   Username: `ubuntu`
        -   Private Key: Paste the content of your `dsa-key.pem`.
    -   `MONGODB_URI_SECRET`: Secret text for Mongo URI.
    -   `JWT_SECRET`: Secret text for JWT secret.
3.  **Pipeline Configuration**:
    -   Update `DOCKER_USER` in the `Jenkinsfile`.
    -   Update `EC2_HOST` in the `Jenkinsfile` with the IP from Terraform output (e.g., `ubuntu@1.2.3.4`).

## 4. Manual Deployment (Optional)

If you want to deploy manually without Jenkins:

1.  SSH into the server:
    ```bash
    ssh -i dsa-key.pem ubuntu@<PUBLIC_IP>
    ```
2.  Copy `docker-compose.prod.yml` to the server.
3.  Run:
    ```bash
    export DOCKER_USER=your-username
    export MONGODB_URI=...
    export JWT_SECRET=...
    docker-compose -f docker-compose.prod.yml up -d
    ```
