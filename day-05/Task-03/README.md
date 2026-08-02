<!-- # Java 21 Unit and PostgreSQL Integration Testing Demo

## Versions
- Java 21
- Spring Boot 3.5.4
- Testcontainers 1.21.3
- PostgreSQL 17

This project deliberately uses Spring Boot 3.x to avoid the Spring Boot 4 modular test-package and Jackson 3 migration issues.

## Run unit tests
```bash
mvn clean test
```
This runs `UserServiceTest`. Integration-test source files are compiled but not executed.

## Run all tests
Docker Desktop must be running.
```bash
docker info
mvn clean verify
```
This also runs `UserRepositoryIT` and `UserApiIT` against disposable PostgreSQL containers.

## Run application
```bash
docker compose up --build
```

## API
```bash
curl -X POST http://localhost:8080/api/users   -H 'Content-Type: application/json'   -d '{"name":"Jiten","email":"jiten@example.com"}'

curl http://localhost:8080/api/users
```

## Coverage
After `mvn clean verify`, open `target/site/jacoco/index.html`. -->

# Java 21 Unit and PostgreSQL Integration Testing Demo

A sample Spring Boot application demonstrating:

- Unit testing with JUnit 5 and Mockito
- Integration testing with Testcontainers
- PostgreSQL integration
- Docker and Docker Compose
- JaCoCo code coverage

---

## Technology Stack

| Component | Version |
|-----------|---------|
| Java | 21 |
| Spring Boot | 3.5.4 |
| Maven | 3.9+ |
| PostgreSQL | 17 |
| Testcontainers | 1.21.3 |
| Docker Compose | v2 |

> **Note:** This project intentionally uses Spring Boot 3.x to avoid the Spring Boot 4 modular test-package changes and Jackson 3 migration.

---

# Prerequisites

Install:

- Java 21
- Maven 3.9+
- Docker Desktop (or Docker Engine)
- Docker Compose

Verify Docker is running:

```bash
docker info
```

---

# Run Unit Tests

Run only unit tests.

```bash
mvn clean test
```

Runs:

- `UserServiceTest`

---

# Run All Tests

Integration tests require Docker because Testcontainers starts PostgreSQL containers.

```bash
docker info
mvn clean verify
```

Runs:

- `UserServiceTest`
- `UserRepositoryIT`
- `UserApiIT`

---

# Run the Application with Docker Compose

Build and start PostgreSQL and the Spring Boot application.

```bash
docker compose up --build
```

Docker Compose will:

1. Build the Spring Boot Docker image.
2. Start the PostgreSQL container.
3. Wait until PostgreSQL is healthy.
4. Start the Spring Boot application.
5. Connect the application to PostgreSQL.

You should see a message similar to:

```
Started TestingApplication
Tomcat started on port 8080
```

---

# Verify Containers

Open another terminal and run:

```bash
docker ps
```

Example:

```
CONTAINER ID   IMAGE                 STATUS
abc123         postgres:17-alpine    Up
xyz789         testing-app           Up
```

---

# Test the REST API

### Create a User

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jiten","email":"jiten@example.com"}'
```

Example response:

```json
{
  "id": 1,
  "name": "Jiten",
  "email": "jiten@example.com"
}
```

---

### Get All Users

```bash
curl http://localhost:8080/api/users
```

Example response:

```json
[
  {
    "id": 1,
    "name": "Jiten",
    "email": "jiten@example.com"
  }
]
```

---

# View Application Logs

If running in detached mode:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f
```

View logs for the application only:

```bash
docker compose logs -f app
```

View PostgreSQL logs:

```bash
docker compose logs -f postgres
```

---

# Stop the Application

If running in the foreground, press:

```
Ctrl + C
```

Or stop the containers from another terminal:

```bash
docker compose down
```

---

# Rebuild After Code Changes

If you modify the source code:

```bash
docker compose up --build
```

Or rebuild explicitly:

```bash
docker compose build
docker compose up
```

---

# Remove Containers and Volumes

Remove containers:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

---

# Docker Commands Reference

Build images:

```bash
docker compose build
```

Start containers:

```bash
docker compose up
```

Build and start:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d
```

View running containers:

```bash
docker ps
```

View logs:

```bash
docker compose logs -f
```

Stop containers:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

---

# Generate Code Coverage

Run:

```bash
mvn clean verify
```

Open the report:

```
target/site/jacoco/index.html
```

---

# Project Structure

```
src
├── main
│   ├── java/com/spanlet/testing
│   │   ├── ApiExceptionHandler.java
│   │   ├── TestingApplication.java
│   │   ├── User.java
│   │   ├── UserController.java
│   │   ├── UserRepository.java
│   │   ├── UserRequest.java
│   │   └── UserService.java
│   └── resources
└── test
    └── java/com/spanlet/testing
        ├── UserApiIT.java
        ├── UserRepositoryIT.java
        └── UserServiceTest.java
```

---

# Testing Strategy

| Test | Purpose |
|------|---------|
| `UserServiceTest` | Unit testing using Mockito |
| `UserRepositoryIT` | Repository integration testing with PostgreSQL Testcontainers |
| `UserApiIT` | End-to-end API integration testing |

---

# Workflow

```text
mvn clean test
        │
        ▼
Run unit tests

docker info
        │
        ▼
mvn clean verify
        │
        ▼
Run unit + integration tests

docker compose up --build
        │
        ▼
Start PostgreSQL
        │
        ▼
Build Spring Boot image
        │
        ▼
Start Spring Boot
        │
        ▼
Application available at
http://localhost:8080
```

---

# Project Architecture

The application follows a layered architecture that separates responsibilities into Controller, Service, Repository, and Database layers.

```
                   HTTP Request
                        │
                        ▼
               UserController
                        │
                        ▼
                 UserService
                        │
                        ▼
              UserRepository (JPA)
                        │
                        ▼
                  PostgreSQL Database
```

### Components

#### 1. Controller Layer

**Class:** `UserController`

Responsibilities:

- Exposes REST APIs
- Accepts HTTP requests
- Validates request bodies
- Delegates business logic to the service layer

Example:

```http
POST /api/users
GET  /api/users
```

---

#### 2. Service Layer

**Class:** `UserService`

Responsibilities:

- Implements business logic
- Converts DTOs into entities
- Calls the repository layer

The service acts as the bridge between the controller and the database.

---

#### 3. Repository Layer

**Interface:** `UserRepository`

Responsibilities:

- Performs database operations
- Extends `JpaRepository`
- Spring Data JPA automatically generates the implementation

Examples:

```java
save()
findAll()
findById()
deleteById()
```

---

#### 4. Database

The application uses **PostgreSQL 17**.

During development:

- PostgreSQL runs inside Docker Compose.

During integration testing:

- PostgreSQL is started automatically by Testcontainers.

---

#### 5. DTO

**Class:** `UserRequest`

Represents incoming JSON requests.

Example request:

```json
{
  "name": "Jiten",
  "email": "jiten@example.com"
}
```

Using a DTO avoids exposing the JPA entity directly.

---

#### 6. Entity

**Class:** `User`

Represents the database table.

```
users
+----+---------+----------------------+
| id | name    | email                |
+----+---------+----------------------+
| 1  | Jiten   | jiten@example.com    |
+----+---------+----------------------+
```

---

#### 7. Global Exception Handler

**Class:** `ApiExceptionHandler`

Handles exceptions thrown by the application and returns consistent JSON error responses.

---

# Request Flow

When a client creates a new user:

```
Client
   │
   ▼
POST /api/users
   │
   ▼
UserController
   │
   ▼
UserService
   │
   ▼
UserRepository
   │
   ▼
PostgreSQL
   │
   ▼
Saved User
   │
   ▼
HTTP Response
```

---

# Testing Architecture

The project contains three types of tests.

## 1. Unit Test

**Class**

```
UserServiceTest
```

Tests only the business logic.

Repository is mocked using Mockito.

```
UserService
      │
      ▼
Mock UserRepository
```

No Spring Boot context.

No PostgreSQL.

Very fast execution.

Run:

```bash
mvn test
```

---

## 2. Repository Integration Test

**Class**

```
UserRepositoryIT
```

Tests database operations using a real PostgreSQL container.

```
UserRepository
       │
       ▼
Testcontainers
       │
       ▼
PostgreSQL 17
```

Run:

```bash
mvn verify
```

---

## 3. API Integration Test

**Class**

```
UserApiIT
```

Starts the complete Spring Boot application.

```
HTTP Request
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
PostgreSQL
```

Verifies the entire application works together.

---

# Docker Architecture

```
                Docker Compose
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
 Spring Boot App            PostgreSQL 17
 (Port 8080)                (Port 5432)
        │                         ▲
        └──────── JDBC ───────────┘
```

The application connects to PostgreSQL using the Docker service name:

```
jdbc:postgresql://postgres:5432/testingdb
```

---

# Project Workflow

```
Developer
     │
     ▼
Write Code
     │
     ▼
Run Unit Tests
mvn clean test
     │
     ▼
Run Integration Tests
mvn clean verify
     │
     ▼
Build Docker Image
docker compose up --build
     │
     ▼
Start PostgreSQL
     │
     ▼
Start Spring Boot
     │
     ▼
Test REST APIs
     │
     ▼
Generate JaCoCo Report
```

---

# Project Structure

```
src
├── main
│   ├── java/com/spanlet/testing
│   │   ├── TestingApplication.java
│   │   ├── User.java
│   │   ├── UserRequest.java
│   │   ├── UserRepository.java
│   │   ├── UserService.java
│   │   ├── UserController.java
│   │   └── ApiExceptionHandler.java
│   └── resources
│       └── application.yml
│
└── test
    └── java/com/spanlet/testing
        ├── UserServiceTest.java
        ├── UserRepositoryIT.java
        └── UserApiIT.java
```