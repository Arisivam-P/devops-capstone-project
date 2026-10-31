pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'arisivam/devops-capstone-app:latest'
        APP_HOST = '172.31.6.65'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub'
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                echo 'Testing Node.js application'
                sh '''
                    docker run --rm \
                    -v "$WORKSPACE:/app" \
                    -w /app \
                    node:20-alpine npm test
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Docker Hub Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                        -u "$DOCKER_USER" --password-stdin
                        docker push "$DOCKER_IMAGE"
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to App EC2') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'app-ec2-ssh',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh '''
                        ssh -i "$SSH_KEY" \
                        -o StrictHostKeyChecking=no \
                        "$SSH_USER@$APP_HOST" '
                            sudo docker pull arisivam/devops-capstone-app:latest
                            sudo docker rm -f capstone-app || true
                            sudo docker run -d \
                            --restart unless-stopped \
                            --name capstone-app \
                            -p 3000:3000 \
                            arisivam/devops-capstone-app:latest
                        '
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Jenkins Console Output.'
        }
    }
}
