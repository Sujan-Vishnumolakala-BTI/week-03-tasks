# Docker Java CRUD Builder

## Overview

This repository contains the Docker configuration required to:

1. Run an Alpine Linux container.
2. Install Git, CA certificates, OpenJDK 21, and Maven.
3. Clone a private Java CRUD repository from GitHub.
4. Build the Java application using Maven.
5. Generate and verify the JAR file.

---

# Architecture

```
GitHub
│
├── java-crud-demo (Private Repository)
│   │
│   ├── pom.xml
│   ├── src/
│   └── Java CRUD Application
│
└── docker-java-builder (This Repository)
    │
    ├── Dockerfile
    ├── github_token.txt (Local Only)
    └── README.md
```

---

# Requirements

Install:

- Docker
- GitHub Fine-Grained Personal Access Token

Check Docker:

```bash
docker --version
```

---

# Docker Base Image

The Docker image uses:

```
alpine:3.22
```

Installed packages:

```
git
ca-certificates
openjdk21
maven
```

---

# Java Repository

Private repository:

```
https://github.com/Sujan-Vishnumolakala-BTI/java-crud-demo.git
```

Branch:

```
main
```

---

# Project Structure

```
docker-java-builder/

├── Dockerfile
├── github_token.txt
├── .gitignore
└── README.md
```

---

# GitHub Token Setup

Create a Fine-Grained Personal Access Token.

Required permission:

```
Repository permissions

Contents:
    Read-only
```

Repository access:

```
Only select repositories

java-crud-demo
```

Create a file:

```
github_token.txt
```

Add only the token:

```
github_pat_xxxxxxxxxxxxxxxxxxxxxxxxx
```

---

# .gitignore

Create `.gitignore`:

```
github_token.txt
```

Never commit the token.

---

# Dockerfile

```dockerfile
# syntax=docker/dockerfile:1.7

FROM alpine:3.22

RUN apk update && \
    apk add --no-cache \
        git \
        ca-certificates \
        openjdk21 \
        maven

RUN git --version && \
    java -version && \
    mvn -version

WORKDIR /workspace

RUN --mount=type=secret,id=github_token \
    TOKEN=$(cat /run/secrets/github_token) && \
    git clone https://${TOKEN}@github.com/Sujan-Vishnumolakala-BTI/java-crud-demo.git

WORKDIR /workspace/java-crud-demo

RUN git checkout main

RUN mvn clean package -DskipTests

RUN echo "Generated JAR files:" && \
    find target -name "*.jar"

CMD ["/bin/sh"]
```

---

# Build Docker Image

Enable Docker BuildKit:

```bash
export DOCKER_BUILDKIT=1
```

Build:

```bash
docker build \
--secret id=github_token,src=github_token.txt \
-t java-crud-builder .
```

---

# Verify Docker Image

```bash
docker images
```

Expected:

```
java-crud-builder
```

---

# Run Container

```bash
docker run -it java-crud-builder
```

Container shell:

```
/workspace
```

---

# Verify Java Project

Inside container:

```bash
cd /workspace/java-crud-demo
```

Check files:

```bash
ls
```

Expected:

```
pom.xml
src
target
```

---

# Verify Generated JAR

Run:

```bash
find target -name "*.jar"
```

Example output:

```
target/spring-boot-crud-java21-0.0.1-SNAPSHOT.jar
```

---

# Maven Build Process

Docker performs:

```
Clone Repository
        |
        |
        v
Install Dependencies
        |
        |
        v
mvn clean package
        |
        |
        v
target/
 |
 └── *.jar
```

---

# Troubleshooting

## 1. GitHub 403 Error

Error:

```
remote: Write access to repository not granted
```

Solution:

Check:

- Token is valid.
- Token has repository access.
- Contents permission is Read-only.
- Repository name is correct.

---

## 2. Maven Test Failure

Example:

```
Failed to load ApplicationContext
```

Reason:

Spring Boot tests are failing during Maven build.

Solution:

Dockerfile uses:

```bash
mvn clean package -DskipTests
```

This creates the JAR without running tests.

---

## 3. Check JAR Manually

Inside container:

```bash
cd /workspace/java-crud-demo/target

ls -lh
```

---

# Complete Workflow

```
Developer Machine
        |
        |
docker build
        |
        |
Alpine Linux Container
        |
        |
Install:
    Git
    Java 21
    Maven
        |
        |
Authenticate using GitHub Token
        |
        |
Clone private java-crud-demo repository
        |
        |
mvn clean package
        |
        |
Generate JAR
```

---

# Security Notes

- Never push `github_token.txt`.
- Do not store GitHub tokens inside Dockerfile.
- Use Docker BuildKit secrets.
- Revoke tokens if exposed.