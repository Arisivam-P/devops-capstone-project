DevOps Capstone Project

Project Description

An end-to-end DevOps CI/CD pipeline for a Node.js web application using Git, GitHub, Jenkins, Docker, Docker Hub, AWS EC2, Prometheus, Grafana, Bash and Cron.

The project automates application testing, Docker image creation, publishing and deployment to AWS EC2.

Technology Stack

Layer| Tools
Source Control| Git, GitHub
CI/CD| Jenkins
Application| Node.js
Containerization| Docker
Image Registry| Docker Hub
Cloud Infrastructure| AWS EC2 (Ubuntu)
Monitoring| Prometheus, Grafana, Node Exporter
Automation| Bash, Cron

Project Architecture

Developer → GitHub → Jenkins → Docker Build → Docker Hub → AWS EC2 → Monitoring

Project Structure

devops-capstone-project/
├── app.js
├── package.json
├── Dockerfile
├── Jenkinsfile
└── README.md

Local Setup Instructions

1. Clone the Repository

git clone https://github.com/Arisivam-P/devops-capstone-project.git
cd devops-capstone-project

2. Install Node.js Dependencies

npm install

3. Test the Application

npm test

4. Run the Application

npm start

Open:

http://localhost:3000

Health check:

http://localhost:3000/health

Docker Setup

Build Docker Image

docker build -t devops-capstone-app:latest .

Run Docker Container

docker run -d \
  --name capstone-app \
  -p 3000:3000 \
  devops-capstone-app:latest

Check Running Containers

docker ps

Docker Hub

Docker image:

arisivam/devops-capstone-app:latest

CI/CD Pipeline

Jenkins automates the following stages:

1. Checkout – Retrieves application source code from GitHub.
2. Build and Test – Validates the Node.js application.
3. Docker Build – Creates the Docker image.
4. Docker Hub Push – Publishes the image to Docker Hub.
5. Deploy to AWS EC2 – Connects to the application server through SSH, pulls the latest image and starts the container.

Monitoring

Prometheus collects infrastructure metrics using Node Exporter.

Grafana displays:

- CPU usage
- Memory usage
- Disk usage
- Network traffic
- System performance

Backup Automation

A Bash script backs up recent Docker container logs.

Backup directory:

/opt/capstone-backups

Cron schedule:

0 2 * * * /usr/local/bin/backup-capstone.sh

This schedules the backup script to run daily at 2:00 AM.

Application Health Check

{
  "status": "healthy"
}

Conclusion

This project demonstrates an automated DevOps workflow using GitHub, Jenkins, Docker, Docker Hub, AWS EC2, Prometheus, Grafana, Bash and Cron.
