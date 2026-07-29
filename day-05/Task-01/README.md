# Spring Boot CRUD Application with PostgreSQL, Docker and Adminer

## Project Overview

This project is a Spring Boot CRUD REST API application connected with PostgreSQL.

The application is containerized using Docker and managed using Docker Compose.

The following changes were completed:

- Changed Spring Boot application port from 8080 to 9090
- Built Docker image separately
- Pushed Docker image to container registry
- Updated Docker Compose to use the pushed image
- Performed CRUD operations using Postman
- Verified database records using Adminer

---

# Technology Stack

- Java Spring Boot
- PostgreSQL
- Docker
- Docker Compose
- Adminer
- Postman

---

# Docker Image

The application image was created and pushed to Docker Registry.

Image:

```
spring-boot-crud-adminer:v0.1.5
```

---

# Application Configuration

## Port Change

Before:

```properties
server.port=${SERVER_PORT:8080}
```

After:

```properties
server.port=${SERVER_PORT:9090}
```

The application runs on:

```
http://localhost:9090
```

---

# Docker Compose Changes

Previously, the application container was built during compose execution.

Before:

```yaml
app:
  build:
    context: .
    dockerfile: Dockerfile
```

After:

```yaml
app:
  image: spring-boot-crud-adminer:v0.1.5
```

Docker Compose now uses the already built image.

---

# Services

## PostgreSQL

Configuration:

```
Database: cruddb
Username: cruduser
Password: crudpassword
Port: 5432
```

---

## Spring Boot Application

Port mapping:

```
9090:9090
```

Database connection:

```
jdbc:postgresql://postgres:5432/cruddb
```

---

## Adminer

Adminer is used to view and verify PostgreSQL data.

Access:

```
http://localhost:8081
```

Login details:

```
System: PostgreSQL
Server: postgres
Username: cruduser
Password: crudpassword
Database: cruddb
```

---

# Docker Commands

## Build Docker Image

```bash
docker build -t <docker-username>/spring-boot-crud-adminer:v0.1.5 .
```

## Push Image

```bash
docker push <docker-username>/spring-boot-crud-adminer:v0.1.5
```

## Start Containers

```bash
docker compose up -d
```

## Stop Containers

```bash
docker compose down
```

## Check Running Containers

```bash
docker ps
```

Running containers:

```
crud-api
crud-postgres
crud-adminer
```

---

# Postman Configuration

## Workspace

Created a workspace for testing CRUD APIs.

Workspace:

```
Spring Boot CRUD
```

---

## Environment

Created environment variables:

| Variable | Value |
|----------|-------|
| baseUrl | http://localhost:9090 |
| productId | 1 |

---

# API Endpoints

Base URL:

```
http://localhost:9090/api/products
```

---

# CRUD Operations

## Create Product

Method:

```
POST
```

URL:

```
{{baseUrl}}/api/products
```

Request Body:

```json
{
  "name": "Laptop",
  "description": "Dell Laptop",
  "price": 75000,
  "quantity": 5
}
```

Response:

```
201 Created
```

---

## Get All Products

Method:

```
GET
```

URL:

```
{{baseUrl}}/api/products
```

Response:

```
200 OK
```

---

## Get Product By ID

Method:

```
GET
```

URL:

```
{{baseUrl}}/api/products/{{productId}}
```

Response:

```
200 OK
```

---

## Update Product

Method:

```
PUT
```

URL:

```
{{baseUrl}}/api/products/{{productId}}
```

Request Body:

```json
{
  "name": "Gaming Laptop",
  "description": "Updated Laptop",
  "price": 95000,
  "quantity": 10
}
```

Response:

```
200 OK
```

---

## Delete Product

Method:

```
DELETE
```

URL:

```
{{baseUrl}}/api/products/{{productId}}
```

Response:

```
204 No Content
```

---

# Database Verification

Adminer URL:

```
http://localhost:8081
```

Login using PostgreSQL credentials.

Verification:

| Operation | Result |
|-----------|--------|
| POST | New product record created |
| GET | Product records retrieved |
| PUT | Product updated |
| DELETE | Product removed |

---

# Final Workflow

```
Spring Boot Application
          |
          v
Docker Image Build
          |
          v
Push Image to Registry
          |
          v
Docker Compose Uses Image
          |
          v
Spring Boot Container
          |
          v
PostgreSQL Database
          |
          v
Adminer Verification
          |
          v
Postman CRUD Testing
```

---

# Completed Tasks

- Spring Boot port changed
- Docker image created
- Docker image pushed
- Docker Compose updated
- PostgreSQL connected
- Adminer configured
- CRUD operations completed
- Database verified
