# Local Docker-Based CI/CD Pipeline for Node.js Application

This project implements a **local CI/CD pipeline using Docker only**.

No Node.js installation is required on the host machine.

The only requirements are:

- Docker
- Docker Compose
- Git

The pipeline replaces GitHub Actions (`ci.yml` and `cd.yml`) with local shell scripts.

---

# Architecture

```text
Developer
    |
    |
    ▼
Run pipeline.sh
    |
    |
    ├──────────── CI Pipeline ────────────┐
    |                                     |
    ▼                                     |
ci.sh                                    |
    |                                     |
    ├── Start Node Docker Container       |
    ├── Install Dependencies              |
    ├── Run Tests                         |
    ├── Build Docker Image                |
    ├── Start Application Container       |
    ├── Health Check                      |
    └── Cleanup                           |
                                          |
    └─────────────────────────────────────┘
                    |
                    ▼
             CD Pipeline
                    |
                    ▼
                  cd.sh
                    |
                    ├── Docker Login
                    ├── Build Release Image
                    ├── Tag Image
                    └── Push Image
```

---

# Project Structure

```text
nodejs-app/
│
├── Dockerfile
├── docker-compose.yml
│
├── package.json
├── package-lock.json
│
├── src/
│   ├── app.js
│   └── server.js
│
├── test/
│   └── app.test.js
│
├── ci.sh
├── cd.sh
├── pipeline.sh
│
├── .gitignore
└── README.md
```

---

# Requirements

Install only:

```bash
docker
docker compose
git
```

Verify:

```bash
docker --version

docker compose version

git --version
```

Node.js and npm are NOT required on the host machine.

---

# Application Files

## src/app.js

```javascript
const express = require("express");

const app = express();


app.get("/", (req,res)=>{

    res.send("Node.js Docker CI/CD Application");

});


module.exports = app;
```

---

## src/server.js

```javascript
const app = require("./app");


app.listen(3000,()=>{

console.log("Application running on port 3000");

});
```

---

# package.json

```json
{
  "name": "nodejs-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.0.0"
  }
}
```

---

# Test File

## test/app.test.js

```javascript
const request = require("supertest");

const app = require("../src/app");


test("Application health check", async()=>{


const response = await request(app)
.get("/");


expect(response.statusCode)
.toBe(200);


});
```

---

# Dockerfile

The Dockerfile provides the Node.js environment.

The host machine does not need Node.js.

```dockerfile
FROM node:20-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD ["npm","start"]
```

---

# Docker Compose

## docker-compose.yml

```yaml
services:

  app:

    build: .

    container_name: nodejs-app

    ports:
      - "3000:3000"

    restart: always
```

---

# Local CI Pipeline

This replaces:

```text
GitHub Actions ci.yml
```

---

## ci.sh

```bash
#!/bin/bash

set -e


echo "======================"
echo "START CI PIPELINE"
echo "======================"


echo "Running tests inside Docker"


docker run --rm \
-v "$(pwd)":/app \
-w /app \
node:20-alpine \
sh -c "npm install && npm test"



echo "Building Docker image"


docker build \
-t nodejs-app:latest .



echo "Starting application container"


docker run -d \
--name node-test-container \
-p 3000:3000 \
nodejs-app:latest



echo "Waiting for application"

sleep 5



echo "Testing application"


curl --fail \
http://localhost:3000



echo "Application logs"


docker logs node-test-container



echo "Cleaning container"


docker stop node-test-container

docker rm node-test-container



echo "======================"
echo "CI SUCCESS"
echo "======================"
```

---

# Local CD Pipeline

This replaces:

```text
GitHub Actions cd.yml
```

---

## cd.sh

```bash
#!/bin/bash

set -e


IMAGE="your-dockerhub-username/nodejs-app"


VERSION=$1


if [ -z "$VERSION" ]

then

echo "Usage: ./cd.sh VERSION"

exit 1

fi



echo "Docker login"

docker login



echo "Building release image"


docker build \
-t $IMAGE:$VERSION .



echo "Pushing image"


docker push \
$IMAGE:$VERSION



echo "CD Completed"
```

---

# Pipeline Runner

Runs CI and CD together.

---

## pipeline.sh

```bash
#!/bin/bash


set -e


VERSION=$1


./ci.sh


./cd.sh $VERSION
```

---

# Make Scripts Executable

Run:

```bash
chmod +x ci.sh

chmod +x cd.sh

chmod +x pipeline.sh
```

Verify:

```bash
ls -l *.sh
```

Output:

```text
-rwxr-xr-x ci.sh
-rwxr-xr-x cd.sh
-rwxr-xr-x pipeline.sh
```

---

# Running the Pipeline

## 1. Run CI Only

```bash
./ci.sh
```

CI performs:

```text
npm install
       |
       ▼
npm test
       |
       ▼
docker build
       |
       ▼
docker run
       |
       ▼
curl health check
```

---

## 2. Run Application

After CI:

Check image:

```bash
docker images
```

Run:

```bash
docker run -d \
--name node-app \
-p 3000:3000 \
nodejs-app:latest
```

Open:

```text
http://localhost:3000
```

Expected:

```text
Node.js Docker CI/CD Application
```

---

Stop:

```bash
docker stop node-app
```

Remove:

```bash
docker rm node-app
```

---

# 3. Run CD

First login:

```bash
docker login
```

Run:

```bash
./cd.sh 1.0.0
```

Result:

```text
Docker Hub

your-dockerhub-username/nodejs-app:1.0.0
```

---

# 4. Run Complete Pipeline

Single command:

```bash
./pipeline.sh 1.0.0
```

Execution:

```text
pipeline.sh

      |
      |
      ▼

    ci.sh

      |
      ├── Test
      ├── Build Docker Image
      ├── Run Container
      └── Health Check


      |
      ▼

    cd.sh

      |
      ├── Docker Login
      ├── Tag Image
      └── Push Image
```

---

# Docker Compose Execution

Build:

```bash
docker compose build
```

Run:

```bash
docker compose up
```

Background:

```bash
docker compose up -d
```

Check:

```bash
docker compose ps
```

Stop:

```bash
docker compose down
```

---

# .gitignore

```gitignore
node_modules/

.env

*.log

coverage/

.DS_Store
```

---

# Local CI/CD vs GitHub Actions Mapping

| GitHub Actions | Local Replacement |
|---|---|
| ci.yml | ci.sh |
| cd.yml | cd.sh |
| GitHub Runner | Docker Container |
| setup-node | node Docker image |
| npm install | Docker execution |
| npm test | Docker execution |
| docker build | docker build |
| docker push | docker push |

---

# Final Workflow

```text
Code Change
     |
     ▼
./pipeline.sh 1.0.0
     |
     |
     ├── CI
     |    |
     |    ├── Install Dependencies
     |    ├── Run Tests
     |    ├── Build Image
     |    └── Validate Application
     |
     |
     └── CD
          |
          ├── Docker Login
          ├── Tag Image
          └── Push Image
```

---

# Result

You now have a complete local Docker-based CI/CD pipeline:

✅ No Node.js installation required  
✅ No GitHub Actions required  
✅ Runs completely from Docker  
✅ Automated testing  
✅ Docker image building  
✅ Docker Hub publishing  
✅ Local CI/CD workflow similar to production pipelines