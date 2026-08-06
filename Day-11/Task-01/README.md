# User Validator - Docker CI/CD Pipeline

A simple Node.js project demonstrating a complete CI/CD pipeline using:

- JavaScript
- Jest Unit Testing
- Docker
- GitHub Actions CI
- GitHub Actions CD
- Docker Hub Image Publishing

---

# Project Structure

```text
user-validator/
│
├── src/
│   ├── index.js
│   └── userValidator.js
│
├── tests/
│   └── userValidator.test.js
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

---

# Prerequisites

Required tools:

- Docker
- Git
- GitHub Account
- Docker Hub Account

Node.js is not required locally because the application runs inside Docker.

---

# Project Setup Commands

Create project:

```bash
mkdir user-validator
cd user-validator
```

Initialize Git:

```bash
git init
```

Create folders:

```bash
mkdir src
mkdir tests
mkdir -p .github/workflows
```

Create files:

```bash
touch src/index.js
touch src/userValidator.js

touch tests/userValidator.test.js

touch Dockerfile
touch .dockerignore

touch .github/workflows/ci.yml
touch .github/workflows/cd.yml

touch README.md
```

---

# Install Dependencies

Initialize Node project:

```bash
npm init -y
```

Install Jest:

```bash
npm install --save-dev jest
```

Install dependencies:

```bash
npm install
```

---

# Docker Commands

## Build Docker Image

```bash
docker build -t user-validator .
```

## Run Tests

```bash
docker run --rm user-validator
```

## Open Container Shell

```bash
docker run -it --rm user-validator sh
```

Inside container:

```bash
npm test
```

Exit:

```bash
exit
```

---

# Git Commands

Check status:

```bash
git status
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial project setup"
```

Add remote:

```bash
git remote add origin <github-repository-url>
```

Push code:

```bash
git branch -M main

git push -u origin main
```

---

# CI/CD Pipeline Architecture

```text
Developer
    |
    | git push / git tag v1.0.0
    |
    ▼
GitHub Repository
    |
    |
    ├──────────────────────────────┐
    |                              |
    ▼                              ▼
CI Workflow                     CD Workflow
(Build & Test Application)       (Build & Publish Image)
    |                              |
    |                              |
    ├─ Checkout code               ├─ Trigger on version tag
    ├─ Setup Docker                ├─ Checkout code
    ├─ Build Docker image          ├─ Docker Hub login
    ├─ Run container tests         ├─ Build Docker image
    ├─ Execute Jest tests          ├─ Tag image version
    ├─ Validate application        ├─ Push Docker Hub
    └─ CI Success                  └─ Deployment completed
```

---

# CI Workflow

File:

```text
.github/workflows/ci.yml
```

CI runs on:

- Push to main branch
- Pull request to main branch

Workflow:

```text
Developer
    |
    |
    git push
    |
    ▼
GitHub Actions CI
    |
    |
    ├─ Checkout repository
    |
    ├─ Build Docker image
    |
    ├─ Start Docker container
    |
    ├─ Run Jest tests
    |
    ├─ Validate application
    |
    └─ CI Success
```

## ci.yml

```yaml
name: Continuous Integration

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

jobs:
  test:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Build Docker Image
        run: docker build -t user-validator .

      - name: Run Tests
        run: docker run --rm user-validator
```

---

# CD Workflow

File:

```text
.github/workflows/cd.yml
```

CD runs only when a Git tag is created.

Example:

```text
v1.0.0
v1.1.0
v2.0.0
```

Workflow:

```text
Developer
    |
    |
    git tag v1.0.0
    |
    ▼
GitHub Actions CD
    |
    |
    ├─ Trigger only on tags
    |
    ├─ Checkout repository
    |
    ├─ Login Docker Hub
    |
    ├─ Build Docker image
    |
    ├─ Tag image version
    |
    ├─ Push Docker Hub
    |
    └─ Deployment completed
```

## cd.yml

```yaml
name: Continuous Deployment

on:
  push:
    tags:
      - "v*"

jobs:

  deploy:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Docker Login
        uses: docker/login-action@v3

        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Docker Image

        run: |

          docker build \
          -t ${{ secrets.DOCKER_USERNAME }}/user-validator:${{ github.ref_name }} \
          -t ${{ secrets.DOCKER_USERNAME }}/user-validator:latest .

      - name: Push Docker Image

        run: |

          docker push ${{ secrets.DOCKER_USERNAME }}/user-validator:${{ github.ref_name }}

          docker push ${{ secrets.DOCKER_USERNAME }}/user-validator:latest
```

---

# Docker Hub Secrets

Create Docker Hub token:

```text
Docker Hub
    |
Account Settings
    |
Security
    |
Access Token
```

Add GitHub repository secrets:

```text
GitHub Repository
    |
Settings
    |
Secrets and Variables
    |
Actions
```

Add:

```text
DOCKER_USERNAME

DOCKER_PASSWORD
```

---

# Release Deployment

Create version tag:

```bash
git tag v1.0.0
```

Push tag:

```bash
git push origin v1.0.0
```

CD workflow starts automatically.

---

# Complete Pipeline Flow

```text
Developer
    |
    |
    | git push
    |
    ▼
GitHub Repository
    |
    ▼
CI Workflow
    |
    |
    ├─ Checkout Code
    ├─ Docker Build
    ├─ Run Tests
    └─ CI Passed
             |
             |
             | git tag v1.0.0
             |
             ▼
CD Workflow
             |
             |
             ├─ Checkout Code
             ├─ Docker Login
             ├─ Build Docker Image
             ├─ Tag Image
             └─ Push Docker Hub
```

---

# Useful Docker Commands

List images:

```bash
docker images
```

List running containers:

```bash
docker ps
```

List all containers:

```bash
docker ps -a
```

Remove image:

```bash
docker rmi user-validator
```

Clean unused resources:

```bash
docker system prune
```

---

# Technology Stack

```text
JavaScript
Node.js
Jest
Docker
GitHub Actions
Docker Hub
```