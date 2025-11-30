# DSA Master - Quick Setup Script
# This script helps you set up the environment files

Write-Host "DSA Master - Environment Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Backend .env setup
Write-Host "Setting up Backend environment..." -ForegroundColor Yellow
$backendEnvPath = "Backend\.env"
$backendEnvExamplePath = "Backend\.env.example"

if (Test-Path $backendEnvPath) {
    Write-Host "Backend .env already exists" -ForegroundColor Green
} else {
    if (Test-Path $backendEnvExamplePath) {
        Copy-Item $backendEnvExamplePath $backendEnvPath
        Write-Host "Created Backend .env from .env.example" -ForegroundColor Green
        Write-Host "Please update Backend\.env with your MongoDB connection string" -ForegroundColor Yellow
    } else {
        Write-Host "Backend .env.example not found" -ForegroundColor Red
    }
}

Write-Host ""

# Frontend .env setup
Write-Host "Setting up Frontend environment..." -ForegroundColor Yellow
$frontendEnvPath = "Frontend\.env"
$frontendEnvExamplePath = "Frontend\.env.example"

if (Test-Path $frontendEnvPath) {
    Write-Host "Frontend .env already exists" -ForegroundColor Green
} else {
    if (Test-Path $frontendEnvExamplePath) {
        Copy-Item $frontendEnvExamplePath $frontendEnvPath
        Write-Host "Created Frontend .env from .env.example" -ForegroundColor Green
    } else {
        Write-Host "Frontend .env.example not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Set up MongoDB (choose one option):" -ForegroundColor White
Write-Host "   Option A: MongoDB Atlas (Cloud - Recommended)" -ForegroundColor Gray
Write-Host "   - Follow instructions in MONGODB_SETUP.md" -ForegroundColor Gray
Write-Host "   - Update Backend\.env with your MongoDB Atlas connection string" -ForegroundColor Gray
Write-Host ""
Write-Host "   Option B: Local MongoDB" -ForegroundColor Gray
Write-Host "   - Install MongoDB Community Server" -ForegroundColor Gray
Write-Host "   - Start MongoDB service: net start MongoDB" -ForegroundColor Gray
Write-Host "   - Backend\.env already has local connection string" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Install dependencies (if not already done):" -ForegroundColor White
Write-Host "   cd Backend; npm install" -ForegroundColor Gray
Write-Host "   cd Frontend; npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the servers:" -ForegroundColor White
Write-Host "   Backend:  cd Backend; npm run dev" -ForegroundColor Gray
Write-Host "   Frontend: cd Frontend; npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Test the application:" -ForegroundColor White
Write-Host "   - Open http://localhost:3000" -ForegroundColor Gray
Write-Host "   - Go to Signup page and create an account" -ForegroundColor Gray
Write-Host "   - Check MongoDB to verify user was created" -ForegroundColor Gray
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Setup complete! Happy coding!" -ForegroundColor Green
