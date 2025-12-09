# DSA Master - Deployment Automation Script
# This script helps automate the deployment process to AWS EC2

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('setup', 'build', 'push', 'terraform', 'deploy', 'all')]
    [string]$Action = 'all',
    
    [Parameter(Mandatory=$false)]
    [string]$DockerUsername = 'parthipan868',
    
    [Parameter(Mandatory=$false)]
    [string]$EC2IP = ''
)

# Color functions for pretty output
function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Step {
    param([string]$Message)
    Write-Host "`n🚀 $Message" -ForegroundColor Magenta
    Write-Host ("=" * 60) -ForegroundColor Magenta
}

# Check if .env file exists
function Check-EnvFile {
    if (-not (Test-Path ".env")) {
        Write-Warning ".env file not found. Creating template..."
        @"
# DSA Master Environment Variables

# DockerHub
DOCKER_USER=$DockerUsername

# MongoDB Atlas (UPDATE THIS!)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa-master?retryWrites=true`&w=majority

# JWT Secret (UPDATE THIS!)
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long

# Node Environment
NODE_ENV=production
"@ | Out-File -FilePath ".env" -Encoding UTF8
        
        Write-Warning "Please update .env file with your actual credentials!"
        return $false
    }
    return $true
}

# Check prerequisites
function Check-Prerequisites {
    Write-Step "Checking Prerequisites"
    
    $allGood = $true
    
    # Check Docker
    try {
        $dockerVersion = docker --version
        Write-Success "Docker installed: $dockerVersion"
    } catch {
        Write-Error-Custom "Docker not found. Please install Docker Desktop."
        $allGood = $false
    }
    
    # Check AWS CLI
    try {
        $awsVersion = aws --version
        Write-Success "AWS CLI installed: $awsVersion"
    } catch {
        Write-Warning "AWS CLI not found. Install with: choco install awscli"
        $allGood = $false
    }
    
    # Check Terraform
    try {
        $terraformVersion = terraform --version | Select-Object -First 1
        Write-Success "Terraform installed: $terraformVersion"
    } catch {
        Write-Warning "Terraform not found. Install with: choco install terraform"
        $allGood = $false
    }
    
    # Check Git
    try {
        $gitVersion = git --version
        Write-Success "Git installed: $gitVersion"
    } catch {
        Write-Error-Custom "Git not found. Please install Git."
        $allGood = $false
    }
    
    return $allGood
}

# Build Docker images
function Build-DockerImages {
    Write-Step "Building Docker Images"
    
    Write-Info "Building Backend image..."
    docker build -t ${DockerUsername}/dsa-master-backend:latest ./Backend
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Backend build failed!"
        return $false
    }
    Write-Success "Backend image built successfully"
    
    Write-Info "Building Frontend image..."
    docker build -t ${DockerUsername}/dsa-master-frontend:latest ./Frontend
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Frontend build failed!"
        return $false
    }
    Write-Success "Frontend image built successfully"
    
    return $true
}

# Push Docker images
function Push-DockerImages {
    Write-Step "Pushing Docker Images to DockerHub"
    
    Write-Info "Logging in to DockerHub..."
    docker login
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Docker login failed!"
        return $false
    }
    
    Write-Info "Pushing Backend image..."
    docker push ${DockerUsername}/dsa-master-backend:latest
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Backend push failed!"
        return $false
    }
    Write-Success "Backend image pushed successfully"
    
    Write-Info "Pushing Frontend image..."
    docker push ${DockerUsername}/dsa-master-frontend:latest
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Frontend push failed!"
        return $false
    }
    Write-Success "Frontend image pushed successfully"
    
    return $true
}

# Run Terraform
function Deploy-Terraform {
    Write-Step "Deploying AWS Infrastructure with Terraform"
    
    Push-Location infrastructure/terraform
    
    Write-Info "Initializing Terraform..."
    terraform init
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Terraform init failed!"
        Pop-Location
        return $false
    }
    
    Write-Info "Planning Terraform deployment..."
    terraform plan
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Terraform plan failed!"
        Pop-Location
        return $false
    }
    
    Write-Warning "Review the plan above. Proceeding with apply..."
    Start-Sleep -Seconds 3
    
    Write-Info "Applying Terraform configuration..."
    terraform apply -auto-approve
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Terraform apply failed!"
        Pop-Location
        return $false
    }
    
    Write-Success "Infrastructure deployed successfully!"
    
    # Get outputs
    Write-Info "Getting EC2 instance details..."
    $publicIP = terraform output -raw public_ip
    Write-Success "EC2 Public IP: $publicIP"
    Write-Info "SSH Command: ssh -i dsa-key.pem ubuntu@$publicIP"
    Write-Warning "Remember to update Jenkinsfile line 11 with EC2_HOST = 'ubuntu@$publicIP'"
    
    # Save IP for later use
    $script:EC2IP = $publicIP
    
    Pop-Location
    return $true
}

# Display summary
function Show-Summary {
    Write-Step "Deployment Summary"
    
    Write-Host ""
    Write-Success "Deployment preparation complete!"
    Write-Host ""
    
    Write-Info "Next Steps:"
    Write-Host "1. Update Jenkinsfile with your DockerHub username and EC2 IP" -ForegroundColor White
    Write-Host "2. Setup MongoDB Atlas (see MONGODB_ATLAS_MIGRATION.md)" -ForegroundColor White
    Write-Host "3. Update .env file with MongoDB Atlas connection string" -ForegroundColor White
    Write-Host "4. Setup Jenkins (see DEPLOYMENT_SETUP.md)" -ForegroundColor White
    Write-Host "5. Create Jenkins pipeline pointing to your GitHub repo" -ForegroundColor White
    Write-Host "6. Run Jenkins pipeline to deploy!" -ForegroundColor White
    Write-Host ""
    
    if ($script:EC2IP) {
        Write-Info "Your EC2 Instance:"
        Write-Host "  Public IP: $($script:EC2IP)" -ForegroundColor Yellow
        Write-Host "  SSH: ssh -i infrastructure/terraform/dsa-key.pem ubuntu@$($script:EC2IP)" -ForegroundColor Yellow
        Write-Host "  Frontend: http://$($script:EC2IP)" -ForegroundColor Yellow
        Write-Host "  Backend: http://$($script:EC2IP):5000" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Info "Documentation:"
    Write-Host "  Workflow: .agent/workflows/aws-ec2-deployment.md" -ForegroundColor White
    Write-Host "  Setup Guide: DEPLOYMENT_SETUP.md" -ForegroundColor White
    Write-Host "  MongoDB Migration: MONGODB_ATLAS_MIGRATION.md" -ForegroundColor White
    Write-Host ""
}

# Main execution
function Main {
    Clear-Host
    Write-Host @"
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        🚀 DSA Master - Deployment Automation 🚀           ║
║                                                            ║
║     Deploying to AWS EC2 with DevOps Pipeline             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan
    
    Write-Host ""
    Write-Info "Action: $Action"
    Write-Info "DockerHub Username: $DockerUsername"
    Write-Host ""
    
    switch ($Action) {
        'setup' {
            if (-not (Check-Prerequisites)) {
                Write-Error-Custom "Prerequisites check failed. Please install missing tools."
                exit 1
            }
            if (-not (Check-EnvFile)) {
                Write-Warning "Please update .env file before proceeding."
                exit 1
            }
            Write-Success "Setup check complete!"
        }
        
        'build' {
            if (-not (Build-DockerImages)) {
                exit 1
            }
        }
        
        'push' {
            if (-not (Push-DockerImages)) {
                exit 1
            }
        }
        
        'terraform' {
            if (-not (Deploy-Terraform)) {
                exit 1
            }
        }
        
        'deploy' {
            if ([string]::IsNullOrEmpty($EC2IP)) {
                Write-Error-Custom "EC2 IP not provided. Run 'terraform' action first or provide -EC2IP parameter."
                exit 1
            }
            Write-Info "Deploy action would connect to EC2 and deploy application..."
            Write-Warning "Please use Jenkins pipeline for deployment."
        }
        
        'all' {
            # Run all steps
            if (-not (Check-Prerequisites)) {
                Write-Error-Custom "Prerequisites check failed. Please install missing tools."
                exit 1
            }
            
            if (-not (Check-EnvFile)) {
                Write-Warning "Please update .env file before proceeding."
                exit 1
            }
            
            if (-not (Build-DockerImages)) {
                exit 1
            }
            
            if (-not (Push-DockerImages)) {
                exit 1
            }
            
            Write-Info "Infrastructure deployment..."
            $deployTerraform = Read-Host "Do you want to deploy AWS infrastructure with Terraform? (yes/no)"
            if ($deployTerraform -eq 'yes') {
                if (-not (Deploy-Terraform)) {
                    exit 1
                }
            } else {
                Write-Warning "Skipping Terraform deployment."
            }
        }
    }
    
    Show-Summary
}

# Run main function
Main
