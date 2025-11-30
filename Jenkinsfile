pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        KUBECONFIG = credentials('kubeconfig-id')
        // Replace with your actual DockerHub username
        DOCKER_USER = 'your-dockerhub-username' 
        APP_NAME = 'dsa-master'
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

        stage('Deploy to EKS') {
            steps {
                script {
                    // Assuming kubectl and helm are installed on Jenkins agent
                    // and KUBECONFIG is set up correctly
                    sh '''
                        helm upgrade --install dsa-master ./infrastructure/helm/dsa-master \
                        --set frontend.image.repository=$DOCKER_USER/$APP_NAME-frontend \
                        --set backend.image.repository=$DOCKER_USER/$APP_NAME-backend \
                        --set backend.env.mongoUri=$MONGODB_URI_SECRET \
                        --set backend.env.jwtSecret=$JWT_SECRET
                    '''
                }
            }
        }
    }
}
