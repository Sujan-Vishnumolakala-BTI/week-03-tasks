# Spring Boot CRUD - GitHub Actions CI/CD Pipeline

This project implements a complete CI/CD pipeline using:

- GitHub Actions
- Maven
- Java 21
- JaCoCo
- SonarCloud
- Docker
- Docker Hub
- GitHub Container Registry (GHCR)

---

# Workflow Files

```
.github/
└── workflows/
    ├── ci.yml
    └── cd.yml
```

---

# Complete Workflow

```
Developer
    |
    | git push / git tag v1.0.0
    |
    ▼
GitHub Repository
    |
    |
    ├─────────────────────────┐
    |                         |
    ▼                         ▼
CI Workflow                  CD Workflow
(Build Java CRUD)            (Deploy Publish Image)
    |                         |
    |                         |
    ├─ Checkout               ├─ Trigger after CI success
    ├─ Java 21 setup          ├─ Checkout code
    ├─ Maven build            ├─ Download JAR artifact
    ├─ Unit tests             ├─ Docker login
    ├─ JaCoCo coverage        ├─ Build Docker image
    ├─ SonarCloud scan        ├─ Push Docker Hub
    ├─ Quality Gate           └─ Push GHCR
    └─ Upload JAR
```
---

# CI Workflow

File:

```
.github/workflows/ci.yml
```

Purpose:

- Build Spring Boot application
- Run tests
- Generate JaCoCo coverage
- Analyze code using SonarCloud
- Upload generated JAR artifact

---

## CI Trigger

The CI workflow runs on:

```yaml
push:
  branches:
    - main

  tags:
    - "v*"

pull_request:
  branches:
    - main

workflow_dispatch:
```

Examples:

Normal development:

```bash
git push origin main
```

Release:

```bash
git tag v1.0.0

git push origin v1.0.0
```

---

# CI Workflow Execution

```
Developer Push
       |
       |
       ▼
GitHub Actions CI
       |
       |
       ├── Checkout source code
       |
       ├── Setup Java 21
       |
       ├── Maven Build
       |
       ├── Run Tests
       |
       ├── Generate JaCoCo Report
       |
       ├── SonarCloud Analysis
       |
       └── Upload JAR Artifact
```

---

# CI Steps

## 1. Checkout Repository

Uses:

```yaml
actions/checkout@v4
```

Downloads project source code.

---

## 2. Setup Java

Uses:

```yaml
actions/setup-java@v4
```

Configuration:

```yaml
java-version: "21"

distribution: "temurin"
```

---

## 3. Build and Test

Command:

```bash
mvn clean verify
```

This performs:

- Compilation
- Unit testing
- JaCoCo coverage generation

Generated report:

```
target/site/jacoco/jacoco.xml
```

---

## 4. SonarCloud Analysis

The CI sends the project analysis to SonarCloud.

Checks:

- Bugs
- Vulnerabilities
- Security issues
- Code smells
- Coverage

Required GitHub Secret:

```
SONAR_TOKEN
```

---

## 5. Upload Artifact

After successful build:

Artifact:

```
spring-boot-jar
```

Contains:

```
target/*.jar
```

This artifact is consumed by CD.

---

# CD Workflow

File:

```
.github/workflows/cd.yml
```

Purpose:

- Download CI artifact
- Build Docker image
- Push Docker images
- Publish release image

---

# CD Trigger

CD starts after CI completion:

```yaml
workflow_run:
  workflows:
    - "Build Java CRUD application"

  types:
    - completed
```

CD runs only when:

```
CI status = success

AND

tag starts with v
```

Example:

```
v1.0.0
v1.0.1
v2.0.0
```

---

# CD Workflow Execution

```
CI Success
     |
     |
     ▼
CD Workflow
     |
     |
     ├── Checkout Source
     |
     ├── Download JAR Artifact
     |
     ├── Docker Hub Login
     |
     ├── GHCR Login
     |
     ├── Build Docker Image
     |
     ├── Push Docker Hub Image
     |
     └── Push GHCR Image
```

---

# CD Steps

## 1. Checkout Source

Uses:

```yaml
actions/checkout@v4
```

Checks out tagged source code.

---

## 2. Download JAR Artifact

Downloads artifact created by CI:

```
spring-boot-jar
```

Example:

```
target/
 └── spring-boot-crud.jar
```

---

## 3. Docker Hub Authentication

Uses:

```yaml
docker/login-action@v3
```

Required secrets:

```
DOCKER_USERNAME

DOCKER_TOKEN
```

---

## 4. GitHub Container Registry Authentication

Uses:

```
GITHUB_TOKEN
```

Provided automatically by GitHub Actions.

Required permission:

```yaml
permissions:
  packages: write
```

---

## 5. Docker Image Build

Creates images:

```
sujanvishnumolakala/sp-crud-demo:v1.0.0

sujanvishnumolakala/sp-crud-demo:latest
```

---

## 6. Push Images

Docker Hub:

```
docker.io/sujanvishnumolakala/sp-crud-demo
```

GHCR:

```
ghcr.io/<github-user>/sp-crud-demo
```

---

# Required GitHub Secrets

Repository:

```
Settings
 |
 Secrets and variables
 |
 Actions
```

Add:

| Secret | Usage |
|---|---|
| SONAR_TOKEN | SonarCloud authentication |
| DOCKER_USERNAME | Docker Hub username |
| DOCKER_TOKEN | Docker Hub access token |

---

# Automatic GitHub Token

No need to create:

```
GITHUB_TOKEN
```

GitHub provides it automatically.

Used for:

- Downloading artifacts
- GHCR authentication
- GitHub API access

---

# Dockerfile Requirement

The Dockerfile must copy the generated JAR.

Example:

```dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
```

---

# Complete Release Flow

Create release:

```bash
git add .

git commit -m "release"

git push origin main
```

Create tag:

```bash
git tag v1.0.0

git push origin v1.0.0
```

Pipeline:

```
v1.0.0 Tag
     |
     ▼
CI
     |
     ├── Build
     ├── Test
     ├── JaCoCo
     ├── SonarCloud
     └── Upload Artifact
              |
              ▼
CD
              |
              ├── Download JAR
              ├── Docker Build
              ├── Docker Hub Push
              └── GHCR Push
```

---

# Final Result

After successful deployment:

Docker Hub:

```
sujanvishnumolakala/sp-crud-demo:v1.0.0
```

GHCR:

```
ghcr.io/<username>/sp-crud-demo:v1.0.0
```

The application is now packaged, scanned, tested, and published automatically.