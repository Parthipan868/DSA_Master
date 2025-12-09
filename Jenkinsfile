pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        // ⚠️ IMPORTANT: Update this with your DockerHub username
        DOCKER_USER = 'parthipan86'  // Change to your actual DockerHub username
        APP_NAME = 'dsa-master'
        
        // ⚠️ IMPORTANT: Update this with your EC2 public IP from Terraform output
        EC2_HOST = 'ubuntu@YOUR_EC2_PUBLIC_IP'  // e.g., 'ubuntu@54.123.45.67'
        SSH_KEY_ID = 'ec2-ssh-key'
        
        // These will be set as Jenkins parameters
        // MONGODB_URI - Your MongoDB Atlas connection string
        // JWT_SECRET - Your JWT secret key
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Docker image...'
                dir('Backend') {
                    sh '''
                        docker build -t $DOCKER_USER/$APP_NAME-backend:latest .
                        docker tag $DOCKER_USER/$APP_NAME-backend:latest $DOCKER_USER/$APP_NAME-backend:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Docker image...'
                dir('Frontend') {
                    sh '''
                        docker build -t $DOCKER_USER/$APP_NAME-frontend:latest .
                        docker tag $DOCKER_USER/$APP_NAME-frontend:latest $DOCKER_USER/$APP_NAME-frontend:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                echo 'Pushing Docker images to DockerHub...'
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        sh '''
                            docker push $DOCKER_USER/$APP_NAME-backend:latest
                            docker push $DOCKER_USER/$APP_NAME-backend:${BUILD_NUMBER}
                            docker push $DOCKER_USER/$APP_NAME-frontend:latest
                            docker push $DOCKER_USER/$APP_NAME-frontend:${BUILD_NUMBER}
                        '''
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to AWS EC2...'
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        # Copy docker-compose file to EC2
                        scp -o StrictHostKeyChecking=no docker-compose.prod.yml $EC2_HOST:/home/ubuntu/docker-compose.yml
                        
                        # Deploy on EC2
                        ssh -o StrictHostKeyChecking=no $EC2_HOST "
                            # Set environment variables
                            export DOCKER_USER=$DOCKER_USER
                            export MONGODB_URI='${MONGODB_URI}'
                            export JWT_SECRET='${JWT_SECRET}'
                            
                            # Stop existing containers
                            docker-compose down || true
                            
                            # Pull latest images
                            docker-compose pull
                            
                            # Start containers
                            docker-compose up -d
                            
                            # Show running containers
                            echo '=== Running Containers ==='
                            docker ps
                            
                            # Wait for services to start
                            sleep 5
                            
                            # Show logs
                            echo '=== Backend Logs ==='
                            docker logs --tail 20 \$(docker ps -q -f name=backend)
                        "
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                script {
                    sh '''
                        # Extract IP from EC2_HOST
                        EC2_IP=$(echo $EC2_HOST | cut -d'@' -f2)
                        
                        # Wait for application to be ready
                        sleep 10
                        
                        # Check backend health
                        echo "Checking backend at http://$EC2_IP:5000"
                        curl -f http://$EC2_IP:5000 || echo "Backend health check failed"
                        
                        # Check frontend
                        echo "Checking frontend at http://$EC2_IP"
                        curl -f http://$EC2_IP || echo "Frontend health check failed"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! Application is now live on AWS EC2.'
        }
        failure {
            echo '❌ Deployment failed. Check the console output for errors.'
        }
        always {
            echo 'Cleaning up Docker images...'
            sh 'docker image prune -f || true'
        }
    }
}
