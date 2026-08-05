<!-- # Spring Boot CRUD Demo — Java 21

A production-structured CRUD REST API for products using Spring Boot 4.1.0, Java 21, Spring Web, Spring Data JPA, Bean Validation, and H2.

## Requirements

- OpenJDK 21 (tested target: OpenJDK 21.0.11)
- Apache Maven 3.6.3 or newer

Verify:

```bash
java -version
mvn -version
```

## Run

```bash
unzip spring-boot-crud-java21.zip
cd spring-boot-crud-java21
mvn clean spring-boot:run
```

Application: `http://localhost:8080`

H2 console: `http://localhost:8080/h2-console`

H2 connection values:

- JDBC URL: `jdbc:h2:file:./data/cruddb`
- User: `sa`
- Password: leave empty

## API endpoints

| Method | URL | Operation |
|---|---|---|
| POST | `/api/products` | Create |
| GET | `/api/products` | Read all |
| GET | `/api/products/{id}` | Read one |
| PUT | `/api/products/{id}` | Update |
| DELETE | `/api/products/{id}` | Delete |

## Test with curl

Create:

```bash
curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Mechanical Keyboard",
    "description": "Hot-swappable keyboard",
    "price": 4999.00,
    "quantity": 10
  }'
```

Get all:

```bash
curl http://localhost:8080/api/products
```

Get one:

```bash
curl http://localhost:8080/api/products/1
```

Update:

```bash
curl -i -X PUT http://localhost:8080/api/products/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Mechanical Keyboard Pro",
    "description": "Wireless hot-swappable keyboard",
    "price": 5999.00,
    "quantity": 8
  }'
```

Delete:

```bash
curl -i -X DELETE http://localhost:8080/api/products/1
```

## Build executable JAR

```bash
mvn clean package
java -jar target/spring-boot-crud-java21-0.0.1-SNAPSHOT.jar
```

## Run tests

```bash
mvn test
```

## Project structure

```text
src/main/java/com/example/crud
├── controller/ProductController.java
├── dto/ProductRequest.java
├── dto/ProductResponse.java
├── entity/Product.java
├── exception/ApiError.java
├── exception/GlobalExceptionHandler.java
├── exception/ResourceNotFoundException.java
├── repository/ProductRepository.java
├── service/ProductService.java
└── CrudApplication.java
``` -->

# Spring Boot CI/CD GitOps Setup Guide

## Overview

This setup uses two private GitHub repositories.

### Repository 1: CI Repository (Private)

Contains:

- Spring Boot application source code
- Maven configuration
- Dockerfile
- GitHub Actions workflow

Responsibilities:

- Build application
- Create Docker image
- Push Docker image to Docker Hub
- Update CD repository image version


### Repository 2: CD Repository (Private)

Contains:

- docker-compose.yml

Responsibilities:

- Store deployment configuration
- Track Docker image versions
- Deploy application using Docker Compose


---

# Complete CI/CD Flow

```
Developer

   |
   |
   v

Private CI Repository

(Spring Boot Code)

   |
   |
   | Push Git Tag
   | Example: v0.1.3

   v

GitHub Actions CI

   |
   |
   +----------------+
   |                |
   v                v

Build JAR       Build Docker Image

                    |
                    v

              Docker Hub

spring-crud-java:v0.1.3

                    |
                    v

Private CD Repository

docker-compose.yml updated

                    |
                    v

Deployment Server

docker compose up -d
```

---

# STEP 1: Create CI Repository

Example:

```
spring-crud-java
```

Structure:

```
spring-crud-java
|
├── src/
|
├── pom.xml
|
├── Dockerfile
|
└── .github/
    |
    └── workflows/
        |
        └── ci.yml
```

This repository contains the Spring Boot application.

---

# STEP 2: Create CD Repository

Example:

```
spring-crud-java-deploy
```

Structure:

```
spring-crud-java-deploy
|
└── docker-compose.yml
```

docker-compose.yml:

```yaml
version: "3.8"

services:

  spring-app:

    image: sujanvishnumolakala/spring-crud-java:v0.1.2

    container_name: spring-crud-java

    ports:
      - "8080:8080"

    restart: always
```

---

# STEP 3: Create Docker Hub Repository

Create Docker Hub repository:

```
sujanvishnumolakala/spring-crud-java
```

This repository stores application images.

Example:

```
spring-crud-java:v0.1.1
spring-crud-java:v0.1.2
spring-crud-java:v0.1.3
```

---

# STEP 4: Add GitHub Secrets in CI Repository

Go to:

```
CI Repository

Settings

Secrets and variables

Actions

New repository secret
```

Add these secrets:

| Secret | Value |
|-|-|
| DOCKER_USERNAME | Docker Hub username |
| DOCKER_PASSWORD | Docker Hub password/token |
| DEPLOY_TOKEN | GitHub Personal Access Token |


Example:

```
DOCKER_USERNAME

sujanvishnumolakala
```

```
DOCKER_PASSWORD

Docker Hub access token
```

```
DEPLOY_TOKEN

GitHub token with repo permission
```

---

# STEP 5: Create DEPLOY_TOKEN

Go to:

```
GitHub

Settings

Developer Settings

Personal Access Tokens

Tokens(classic)
```

Create token with:

```
repo
```

permission.

This allows CI repository workflow to update the private CD repository.

---

# STEP 6: Configure CI Workflow

File:

```
.github/workflows/ci.yml
```

Workflow triggers only on version tags.

Example:

```yaml
on:

  push:

    tags:

      - 'v*'
```

Example tag:

```
v0.1.3
```

---

# STEP 7: Developer Makes Code Changes

Modify Spring Boot code.

Example:

```
Controller updated
Service updated
Database changes
```

---

# STEP 8: Test Application Locally

Go to CI repository:

```bash
cd spring-crud-java
```

Build:

```bash
mvn clean package -DskipTests
```

Expected:

```
BUILD SUCCESS
```

---

# STEP 9: Commit Code Changes

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Update application"
```

Push:

```bash
git push origin main
```

---

# STEP 10: Create Release Tag

Create version tag:

```bash
git tag v0.1.3
```

Push tag:

```bash
git push origin v0.1.3
```

Important:

The GitHub Actions workflow starts only after this tag push.

---

# STEP 11: CI Pipeline Execution

GitHub Actions performs:

## 1. Checkout Code

Downloads Spring Boot source code.

---

## 2. Setup Java 21

Installs Java environment.

---

## 3. Build Application

Runs:

```bash
mvn clean package -DskipTests
```

Creates:

```
target/*.jar
```

---

## 4. Docker Login

Uses:

```
DOCKER_USERNAME

DOCKER_PASSWORD
```

---

## 5. Build Docker Image

Creates:

```
sujanvishnumolakala/spring-crud-java:v0.1.3
```

---

## 6. Push Docker Image

Uploads image to Docker Hub.

Result:

```
Docker Hub

spring-crud-java:v0.1.3
```

---

## 7. Clone CD Repository

Workflow accesses:

```
spring-crud-java-deploy
```

using:

```
DEPLOY_TOKEN
```

---

## 8. Update docker-compose.yml


Before:

```yaml
image: sujanvishnumolakala/spring-crud-java:v0.1.2
```


After:

```yaml
image: sujanvishnumolakala/spring-crud-java:v0.1.3
```

---

## 9. Commit CD Change

Example commit:

```
Update image version to v0.1.3
```

---

## 10. Push CD Repository


CD repository now contains:

```yaml
image: sujanvishnumolakala/spring-crud-java:v0.1.3
```

---

# STEP 12: Verify CI Pipeline

Open:

```
CI Repository

Actions

Workflow Run
```

Expected:

```
SUCCESS

✓ Checkout Code

✓ Java Setup

✓ Maven Build

✓ Docker Login

✓ Docker Build

✓ Docker Push

✓ Update CD Repository

✓ Commit Change

✓ Push Change
```

---

# STEP 13: Verify Docker Image

Pull image:

```bash
docker pull sujanvishnumolakala/spring-crud-java:v0.1.3
```

Run:

```bash
docker run -d \
-p 8080:8080 \
--name spring-crud-java \
sujanvishnumolakala/spring-crud-java:v0.1.3
```

Check:

```bash
docker ps
```

Logs:

```bash
docker logs spring-crud-java
```

---

# STEP 14: Deploy From CD Repository

On deployment server:

Clone repository:

```bash
git clone <CD_REPOSITORY_URL>
```

Enter directory:

```bash
cd spring-crud-java-deploy
```

Check image:

```bash
cat docker-compose.yml
```

Expected:

```yaml
image: sujanvishnumolakala/spring-crud-java:v0.1.3
```

---

# STEP 15: Start Deployment

Pull latest image:

```bash
docker compose pull
```

Start application:

```bash
docker compose up -d
```

Check:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

---

# Complete Release Test

Run:

```bash
git add .

git commit -m "Release update"

git tag v0.1.3

git push origin v0.1.3
```

Wait for GitHub Actions.

Verify:

```
Docker Hub
        |
        |
        v

spring-crud-java:v0.1.3


CD Repository

        |
        |
        v

docker-compose.yml updated


Server

        |
        |
        v

docker compose up -d
```

---

# Final Architecture

```
PRIVATE CI REPO

Spring Boot Code

        |
        |
        v

GitHub Actions

        |
        |
        v

Docker Hub Image

        |
        |
        v

PRIVATE CD REPO

docker-compose.yml

        |
        |
        v

Deployment Server
```

---

# Result

Every application release is controlled by Git tags.

Example:

```
v0.1.1
v0.1.2
v0.1.3
```

Each tag creates:

1. New Docker image
2. New CD configuration version
3. Repeatable deployment

This provides a GitOps-based CI/CD workflow.