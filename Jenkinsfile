pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        // Replace with your actual DockerHub username
        DOCKER_USER = 'your-dockerhub-username' 
        APP_NAME = 'dsa-master'
        // SSH Credentials for EC2
        EC2_HOST = 'ubuntu@<YOUR_EC2_PUBLIC_IP>'
        SSH_KEY_ID = 'ec2-ssh-key' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    sh 'docker build -t $DOCKER_USER/$APP_NAME-frontend:latest .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('Backend') {
                    sh 'docker build -t $DOCKER_USER/$APP_NAME-backend:latest .'
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        sh 'docker push $DOCKER_USER/$APP_NAME-frontend:latest'
                        sh 'docker push $DOCKER_USER/$APP_NAME-backend:latest'
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        scp -o StrictHostKeyChecking=no docker-compose.prod.yml $EC2_HOST:/home/ubuntu/docker-compose.yml
                        ssh -o StrictHostKeyChecking=no $EC2_HOST "
                            export DOCKER_USER=$DOCKER_USER
                            export MONGODB_URI=$MONGODB_URI_SECRET
                            export JWT_SECRET=$JWT_SECRET
                            docker-compose pull
                            docker-compose up -d
                        "
                    '''
                }
            }
        }
    }
}
