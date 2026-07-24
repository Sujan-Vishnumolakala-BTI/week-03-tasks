# NGINX Task 03 Demo - Docker Container

## Overview

This project demonstrates how to create and run a custom NGINX web server using Docker.

The application uses the official lightweight `nginx:alpine` image, removes the default NGINX welcome page, and serves a custom `index.html` page.

The Docker container runs NGINX on port `80` and maps it to port `8081` on the host machine.

---

## Project Structure

```
nginx-task03-demo/
│
├── Dockerfile
├── index.html
└── README.md
```

---

## Docker Image Details

**Docker Image**

```
nginx-task03-demo:v0.1.1
```

---

## Dockerfile

```dockerfile
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

---

## Dockerfile Explanation

### 1. Base Image

```dockerfile
FROM nginx:alpine
```

Uses the official NGINX Alpine Linux image.

Benefits:

- Small image size
- Faster deployment
- Less resource consumption

---

### 2. Remove Default NGINX Content

```dockerfile
RUN rm -rf /usr/share/nginx/html/*
```

Removes the default NGINX welcome page.

This allows the custom website content to be displayed.

---

### 3. Copy Custom HTML Page

```dockerfile
COPY index.html /usr/share/nginx/html/index.html
```

Copies the custom `index.html` file into the NGINX web server directory.

NGINX serves web content from:

```
/usr/share/nginx/html/
```

---

### 4. Expose Port

```dockerfile
EXPOSE 80
```

Defines port `80` as the container application port.

---

### 5. Start NGINX Server

```dockerfile
CMD ["nginx","-g","daemon off;"]
```

Runs NGINX in the foreground so that the Docker container remains active.

---

# Prerequisites

Install the following:

- Docker Desktop / Docker Engine
- Docker Hub Account

Check Docker installation:

```bash
docker --version
```

---

# Build Docker Image

Navigate to the project directory:

```bash
cd nginx-task03-demo
```

Build the Docker image:

```bash
docker build -t nginx-task03-demo:v0.1.1 .
```

---

# Verify Docker Image

Check created images:

```bash
docker images
```

Expected output:

```
REPOSITORY          TAG
nginx-task03-demo   v0.1.1
```

---

# Run Docker Container

Start the container:

```bash
docker run -d \
-p 8081:80 \
--name nginx-task03-demo \
nginx-task03-demo:v0.1.1
```

### Command Explanation

| Command | Description |
|---------|-------------|
| `docker run` | Creates and starts a container |
| `-d` | Runs container in background |
| `-p 8081:80` | Maps host port 8081 to container port 80 |
| `--name` | Assigns container name |
| Image name | Docker image to run |

---

# Check Running Container

```bash
docker ps
```

Example:

```
CONTAINER ID   IMAGE                 PORTS
xxxxxxx        nginx-task03-demo     0.0.0.0:8081->80/tcp
```

---

# Access Application

Open your browser:

```
http://localhost:8081
```

The custom `index.html` page will be displayed.

---

# Docker Container Management

## Stop Container

```bash
docker stop nginx-task03-demo
```

---

## Start Container

```bash
docker start nginx-task03-demo
```

---

## Restart Container

```bash
docker restart nginx-task03-demo
```

---

## Remove Container

```bash
docker rm nginx-task03-demo
```

---

## View Container Logs

```bash
docker logs nginx-task03-demo
```

---

# Push Image to Docker Hub

## Login

```bash
docker login
```

---

## Tag Image

```bash
docker tag nginx-task03-demo:v0.1.1 <dockerhub-username>/nginx-task03-demo:v0.1.1
```

---

## Push Image

```bash
docker push <dockerhub-username>/nginx-task03-demo:v0.1.1
```

---

# Pull Image from Docker Hub

Download the image:

```bash
docker pull <dockerhub-username>/nginx-task03-demo:v0.1.1
```

Run the image:

```bash
docker run -d \
-p 8081:80 \
--name nginx-task03-demo \
<dockerhub-username>/nginx-task03-demo:v0.1.1
```

---

# Troubleshooting

## Image Not Found Error

Error:

```
Unable to find image 'nginx-task03-demo:v0.1.1'
```

Solution:

Build the image:

```bash
docker build -t nginx-task03-demo:v0.1.1 .
```

Verify:

```bash
docker images
```

---

## Port Already in Use

If port `8081` is already occupied:

```bash
docker run -d \
-p 8082:80 \
--name nginx-task03-demo \
nginx-task03-demo:v0.1.1
```

Access:

```
http://localhost:8082
```

---

# Technologies Used

| Technology | Purpose |
|------------|---------|
| Docker | Containerization platform |
| NGINX | Web server |
| Alpine Linux | Lightweight base image |
| HTML | Web page content |

