# 🚀 Task-03: Sum of All Elements in a 3D Array Using JavaScript & Docker

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Level](https://img.shields.io/badge/Level-Beginner-blue)

---

## 📖 Overview

This project demonstrates how to work with a **3D Array** in JavaScript by traversing all of its elements using nested loops and calculating the sum of every value.

The project is also containerized using **Docker**, making it easy to run the JavaScript program in an isolated and consistent environment.

---

## 🎯 Objectives

- Understand the structure of a 3D array.
- Traverse nested arrays using three `for` loops.
- Calculate the sum of all elements.
- Run a JavaScript application inside a Docker container.
- Learn the basics of Docker image creation and container execution.

---

## 📚 Concepts Covered

### JavaScript

- Variables
- Arrays
- Three-Dimensional Arrays
- Nested `for` Loops
- Arithmetic Operations
- Console Output

### Docker

- Docker Images
- Docker Containers
- Dockerfile
- Working Directory
- Copying Files
- Running Applications

---

## ⚙️ How the Program Works

1. A three-dimensional array is created.
2. Three nested loops iterate through every dimension of the array.
3. Each value is added to a running total.
4. After all elements are processed, the final sum is displayed in the console.

---

## 📊 Expected Output

```
Sum : 780
```

---

# 🐳 Dockerfile Explanation

The Dockerfile prepares a lightweight environment for running the JavaScript application.

### `FROM node:24-alpine`

- Uses the official **Node.js 24 Alpine** image.
- Alpine Linux is lightweight, making Docker images smaller and faster.

---

### `WORKDIR /app`

- Creates the `/app` directory inside the container if it doesn't already exist.
- Sets `/app` as the current working directory.
- All subsequent commands are executed from this location.

---

### `COPY *.js .`

- Copies all JavaScript (`.js`) files from the current project directory into `/app` inside the container.

---

### `CMD ["node","script.js"]`

- Specifies the default command to execute when the container starts.
- Runs the JavaScript application using Node.js.

---

# 🛠 Docker Commands Explained

## 1️⃣ Build the Docker Image

```bash
docker build -t <docker-username>/js-demo-node:v0.1.3 .
```

### Explanation

| Part | Description |
|------|-------------|
| `docker build` | Builds a Docker image from the Dockerfile. |
| `-t` | Assigns a name (tag) to the image. |
| `<docker-username>/js-demo-node` | Image repository name. |
| `v0.1.3` | Image version (tag). |
| `.` | Uses the current directory as the build context. |

This command creates a reusable Docker image containing the JavaScript application.

---

## 2️⃣ Run the Application

```bash
docker run --rm <docker-username>/js-demo-node:v0.1.3
```

### Explanation

| Part | Description |
|------|-------------|
| `docker run` | Starts a new container from the image. |
| `--rm` | Automatically removes the container after it exits. |
| `<docker-username>/js-demo-node:v0.1.3` | Specifies the image to run. |

Since the Dockerfile already defines the default command (`CMD`), there's no need to specify `node script.js` again.

---

## 3️⃣ Start an Interactive Node Container

```bash
docker run -it --rm -v "$(pwd):/app" -w /app node:24-alpine sh
```

### Explanation

| Part | Description |
|------|-------------|
| `docker run` | Starts a new container. |
| `-it` | Opens an interactive terminal session. |
| `--rm` | Removes the container after exiting. |
| `-v "$(pwd):/app"` | Mounts the current project directory into `/app` inside the container. |
| `-w /app` | Sets `/app` as the working directory. |
| `node:24-alpine` | Uses the official Node.js Alpine image. |
| `sh` | Starts the Alpine Linux shell. |

This command is useful for development because any changes made to your local files are immediately available inside the container.

---

## 📁 Project Structure

```
Task-03/
├── script.js
├── Dockerfile
└── README.md
```

---

## 🎓 Learning Outcomes

After completing this task, you will be able to:

- Understand the structure of multidimensional arrays.
- Traverse a 3D array using nested loops.
- Calculate values from nested collections.
- Build Docker images.
- Run JavaScript applications inside Docker containers.
- Use Docker volumes for development.
- Work with interactive Docker containers.

---

## 🚀 Technologies Used

- JavaScript (ES6)
- Node.js 24
- Docker
- Alpine Linux

---

## ✨ Conclusion

This project combines JavaScript programming with Docker containerization. It demonstrates how to process data stored in a three-dimensional array while introducing the fundamentals of Docker, including image creation, container execution, and interactive development environments.

---

<!-- docker build -t sujanvishnumolakala/js-demo-node:v0.1.3 .

docker run --rm sujanvishnumolakala/js-demo-node:v0.1.3 node script.js

docker run -it --rm -v "$(pwd):/app" -w /app node:24-alpine sh -->