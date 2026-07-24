# NGINX Task 04 Demo - Docker Container

## Overview

This project demonstrates how to build and deploy a custom static website using an NGINX Docker container.

The application uses the official lightweight `nginx:alpine` image. The website files, including HTML pages and CSS stylesheets, are copied into the NGINX web server directory and served through the container.

The application is exposed on port `8082` of the host machine.

---

# Project Structure

```
nginx-task04-demo/
│
├── mydockerfile
├── index.html
├── contact.html
│
├── css/
│   ├── style.css
│   └── contactstyle.css
│
└── README.md
```

---

# Docker Image Details

## Image Name

```
nginx-task04-demo
```

## Image Tag

```
v0.1.2
```

## Complete Image Reference

```
<dockerhub-username>/nginx-task04-demo:v0.1.2
```

---

# Dockerfile

File name:

```
mydockerfile
```

Content:

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

---

# Dockerfile Explanation

## 1. Base Image

```dockerfile
FROM nginx:alpine
```

Uses the official NGINX Alpine image.

Benefits:

- Lightweight image
- Faster container startup
- Reduced storage usage

---

## 2. Copy Website Files

```dockerfile
COPY . /usr/share/nginx/html/
```

Copies all project files into the NGINX web root directory.

The copied files include:

- `index.html`
- `contact.html`
- `css/style.css`
- `css/contactstyle.css`

NGINX serves static files from:

```
/usr/share/nginx/html/
```

---

## 3. Expose Port

```dockerfile
EXPOSE 80
```

Defines port `80` as the container HTTP port.

---

## 4. Start NGINX Server

```dockerfile
CMD ["nginx","-g","daemon off;"]
```

Runs NGINX in the foreground.

This keeps the Docker container running.

---

# Prerequisites

Install:

- Docker Desktop / Docker Engine
- Docker Hub account (optional)

Verify Docker installation:

```bash
docker --version
```

---

# Build Docker Image

Navigate to the project directory:

```bash
cd nginx-task04-demo
```

Build the Docker image:

```bash
docker build -f mydockerfile -t nginx-task04-demo:v0.1.2 .
```

---

# Verify Docker Image

Check available images:

```bash
docker images
```

Expected output:

```
REPOSITORY          TAG
nginx-task04-demo   v0.1.2
```

---

# Run Docker Container

Start the NGINX container:

```bash
docker run -d \
-p 8082:80 \
--name nginx-task04-demo \
nginx-task04-demo:v0.1.2
```

---

# Command Explanation

| Command | Description |
|---------|-------------|
| `docker run` | Creates and starts a container |
| `-d` | Runs container in background |
| `-p 8082:80` | Maps host port 8082 to container port 80 |
| `--name` | Assigns container name |
| Image name | Docker image used to create container |

---

# Verify Running Container

Check running containers:

```bash
docker ps
```

Example output:

```
CONTAINER ID   IMAGE                    PORTS
xxxxxxx        nginx-task04-demo        0.0.0.0:8082->80/tcp
```

---

# Access Website

Open the browser:

```
http://localhost:8082
```

Available pages:

### Home Page

```
http://localhost:8082/index.html
```

### Contact Page

```
http://localhost:8082/contact.html
```

---

# Website Files

## index.html

Main landing page of the website.

Uses:

```
css/style.css
```

for styling.

---

## contact.html

Contact page of the website.

Uses:

```
css/contactstyle.css
```

for page-specific styling.

---

# Docker Container Management

## Stop Container

```bash
docker stop nginx-task04-demo
```

---

## Start Container

```bash
docker start nginx-task04-demo
```

---

## Restart Container

```bash
docker restart nginx-task04-demo
```

---

## Remove Container

```bash
docker rm nginx-task04-demo
```

---

## Force Remove Container

```bash
docker rm -f nginx-task04-demo
```

---

## View Container Logs

```bash
docker logs nginx-task04-demo
```

---

# Docker Hub Operations

## Login to Docker Hub

```bash
docker login
```

---

## Tag Image

```bash
docker tag nginx-task04-demo:v0.1.2 <dockerhub-username>/nginx-task04-demo:v0.1.2
```

---

## Push Image

```bash
docker push <dockerhub-username>/nginx-task04-demo:v0.1.2
```

---

## Pull Image

```bash
docker pull <dockerhub-username>/nginx-task04-demo:v0.1.2
```

---

# Troubleshooting

## Container Name Already Exists

Error:

```
Conflict. The container name is already in use
```

Solution:

Check existing containers:

```bash
docker ps -a
```

Remove the existing container:

```bash
docker rm -f nginx-task04-demo
```

Run again:

```bash
docker run -d -p 8082:80 --name nginx-task04-demo nginx-task04-demo:v0.1.2
```

---

## Port Already in Use

Error:

```
port is already allocated
```

Solution:

Run with another port:

```bash
docker run -d \
-p 8083:80 \
--name nginx-task04-demo \
nginx-task04-demo:v0.1.2
```

Access:

```
http://localhost:8083
```

---

# Useful Docker Commands

## List Running Containers

```bash
docker ps
```

---

## List All Containers

```bash
docker ps -a
```

---

## List Images

```bash
docker images
```

---

## Remove Unused Containers

```bash
docker container prune
```

---

## Remove Unused Images

```bash
docker image prune
```

---

# Technologies Used

| Technology | Purpose |
|------------|---------|
| Docker | Containerization platform |
| NGINX | Web server |
| Alpine Linux | Lightweight base image |
| HTML5 | Website structure |
| CSS3 | Website styling |

---
