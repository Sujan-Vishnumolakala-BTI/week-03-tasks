# Spring Boot CRUD Application - Docker Deployment Guide


## Project Overview

This project is a Spring Boot CRUD REST API application running with Java 21.

The application exposes product APIs:

```
GET     /api/products
GET     /api/products/{id}
POST    /api/products
PUT     /api/products/{id}
DELETE  /api/products/{id}

```

The application can be executed using:

1. Dockerfile
2. compose.yaml
3. compose-image.yaml


---

# Application Architecture


```
                 Spring Boot Application

                         |
                         |
                         v

                  Docker Container

                         |
                         |
                         v

                 REST API Endpoints

                         |
                         |
                         v

                     Postman

```


---

# 1. Running Application Using Dockerfile


## Dockerfile


```dockerfile
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml .

COPY src src

RUN mvn -q -DskipTests package


FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /workspace/target/spring-boot-crud-java21-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]

```


---

# Dockerfile Flow


```
Source Code

     |
     |
     v

Maven Build

     |
     |
     v

Create JAR File

     |
     |
     v

Java Runtime Image

     |
     |
     v

Docker Container

     |
     |
     v

Spring Boot Application

```


---

# Build Docker Image


Command:


```bash
docker build -t spring-boot-crud:v0.1.4 .

```


Check image:


```bash
docker images

```


---

# Run Docker Container


Command:


```bash
docker run -p 8080:8080 spring-boot-crud:v0.1.4

```


Application URL:


```
http://localhost:8080

```


---

# 2. compose.yaml


## Purpose

`compose.yaml` is used during development.

It builds the Docker image using the Dockerfile and starts the container.


Architecture:


```
Source Code

      |
      |
      v

Dockerfile

      |
      |
      v

Docker Image

      |
      |
      v

Docker Compose

      |
      |
      v

Container

```


---

# compose.yaml File


```yaml
services:

  crud-api:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - crud-data:/app/data


volumes:

  crud-data:

```


---

# compose.yaml Explanation


## build


```yaml
build: .

```

Uses the Dockerfile from the current directory.


---

## ports


```yaml
ports:
  - "8080:8080"

```


Mapping:


```
HOST MACHINE        CONTAINER


8080       --->      8080

```


Access:


```
http://localhost:8080

```


---

## volumes


```yaml
volumes:
 - crud-data:/app/data

```


Purpose:

- Store H2 database permanently
- Keep data after restart


Flow:


```
Spring Boot

    |
    |
    v

/app/data

    |
    |
    v

Docker Volume

    |
    |
    v

Database Storage

```


---

# Run compose.yaml


Build and start:


```bash
docker compose up --build

```


Run in background:


```bash
docker compose up -d

```


Check containers:


```bash
docker compose ps

```


View logs:


```bash
docker compose logs -f

```


Stop:


```bash
docker compose down

```


Remove volume:


```bash
docker compose down -v

```


---

# 3. compose-image.yaml


## Purpose

`compose-image.yaml` runs an already created Docker image.

It does not build source code.

It is mainly used for deployment.


Architecture:


```
Docker Hub

     |
     |
     v

Docker Image

     |
     |
     v

compose-image.yaml

     |
     |
     v

Docker Container

     |
     |
     v

Application Running

```


---

# compose-image.yaml File


```yaml
services:

  crud-api:

    image: spring-boot-crud:v0.1.4

    ports:
      - "8080:8080"

    volumes:
      - crud-data:/app/data


volumes:

  crud-data:

```


---

# compose-image.yaml Explanation


## image


```yaml
image: spring-boot-crud:v0.1.4

```


Uses an existing Docker image.


No:

```
Dockerfile

Maven Build

Source Compilation

```


Required:

```
Docker Image

```


---

# Run compose-image.yaml


Start:


```bash
docker compose -f compose-image.yaml up

```


Background:


```bash
docker compose -f compose-image.yaml up -d

```


Check status:


```bash
docker compose -f compose-image.yaml ps

```


Logs:


```bash
docker compose -f compose-image.yaml logs -f

```


Stop:


```bash
docker compose -f compose-image.yaml down

```


Remove volume:


```bash
docker compose -f compose-image.yaml down -v

```


---

# Docker Hub Commands


Login:


```bash
docker login

```


Build:


```bash
docker build -t spring-boot-crud:v0.1.4 .

```


Push:


```bash
docker push spring-boot-crud:v0.1.4

```


Pull:


```bash
docker pull spring-boot-crud:v0.1.4

```


---

# Postman Testing


Base URL:


```
http://localhost:8080/api/products

```


---

# Create Product


Method:

```
POST

```


URL:


```
http://localhost:8080/api/products

```


Headers:


```
Content-Type : application/json

```


Body:


```json
{
"name":"Laptop",
"description":"Dell Laptop",
"price":75000,
"quantity":5
}

```


Response:


```
201 Created

```


---

# Get All Products


Method:


```
GET

```


URL:


```
http://localhost:8080/api/products

```


---

# Get Product By ID


Method:


```
GET

```


URL:


```
http://localhost:8080/api/products/1

```


---

# Update Product


Method:


```
PUT

```


URL:


```
http://localhost:8080/api/products/1

```


Body:


```json
{
"name":"Updated Laptop",
"description":"Updated",
"price":80000,
"quantity":10
}

```


---

# Delete Product


Method:


```
DELETE

```


URL:


```
http://localhost:8080/api/products/1

```


Response:


```
204 No Content

```


---

# Complete Deployment Flow


```
Developer Code

       |
       |
       v

Dockerfile

       |
       |
       v

Docker Image

       |
       |
       v

Docker Hub

       |
       |
       v

compose-image.yaml

       |
       |
       v

Docker Container

       |
       |
       v

Spring Boot CRUD API

       |
       |
       v

Postman Testing

```


---

# Summary


| Component | Purpose |
|-|-|
| Dockerfile | Builds application image |
| compose.yaml | Builds and runs application locally |
| compose-image.yaml | Runs existing Docker image |
| Docker Hub | Stores Docker images |
| Volume | Stores database data |
| Postman | Tests REST APIs |


