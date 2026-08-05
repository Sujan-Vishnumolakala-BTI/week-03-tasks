# Node.js Application – CI/CD Pipeline

This project uses **GitHub Actions** to automate Continuous Integration (CI) and Continuous Deployment (CD) for a Node.js application. The pipeline performs CodeQL security analysis, Docker image build and validation, Docker image publishing, and automatic deployment repository updates.

---

# CI/CD Architecture

```text
Developer
    │
    │ Push to main
    │ or Create Version Tag (v1.0.0)
    ▼
GitHub Repository
    │
    ├────────────── CI Workflow ───────────────┐
    │                                          │
    ├── CodeQL Security Scan                   │
    │      │                                   │
    │      ├── Checkout Repository             │
    │      ├── Initialize CodeQL               │
    │      └── Perform CodeQL Analysis         │
    │                                          │
    ├── Docker Build & Test                    │
    │      │                                   │
    │      ├── Checkout Repository             │
    │      ├── Build Docker Image              │
    │      ├── Run Container                   │
    │      ├── Wait for Startup                │
    │      ├── Verify Container                │
    │      ├── View Logs                       │
    │      ├── Test Application                │
    │      └── Cleanup                         │
    │                                          │
    └──────────────────────────────────────────┘
                         │
                         │ Version Tag (v*)
                         ▼
                  CD Workflow Trigger
                         │
                         ▼
                Checkout Repository
                         ▼
               Extract Release Version
                         ▼
                 Docker Hub Login
                         ▼
                Build Docker Image
                         ▼
                Push Docker Image
                         ▼
          Clone Deployment Repository
                         ▼
       Update docker-compose.yml Image Tag
                         ▼
            Commit & Push Changes
```

---

# Continuous Integration (CI)

Workflow file:

```text
.github/workflows/ci.yml
```

## Trigger Events

The CI workflow runs when:

- Push to `main`
- Pull Request targeting `main`

```yaml
on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main
```

---

## Workflow Permissions

```yaml
permissions:
  contents: read
  security-events: write
```

| Permission | Purpose |
|------------|---------|
| contents: read | Checkout repository |
| security-events: write | Upload CodeQL results |

---

# CI Jobs

The workflow contains two independent jobs:

- CodeQL Security Scan
- Docker Build and Test

---

## Job 1 – CodeQL Security Scan

### Checkout Repository

```yaml
uses: actions/checkout@v4
```

Downloads the project source code.

---

### Initialize CodeQL

```yaml
uses: github/codeql-action/init@v3
```

Configured for:

- JavaScript

---

### Perform CodeQL Analysis

```yaml
uses: github/codeql-action/analyze@v3
```

Performs Static Application Security Testing (SAST) and uploads results to GitHub Security.

---

## Job 2 – Docker Build and Test

### Checkout Repository

Downloads the application source.

---

### Build Docker Image

```bash
docker build -t nodejs-app .
```

Creates the application Docker image.

---

### Run Docker Container

Runs the application container.

```bash
docker run -d \
--name node-container \
-p 3000:3000 \
nodejs-app
```

---

### Wait for Startup

```bash
sleep 5
```

Allows the application time to start.

---

### Verify Running Container

Displays running containers.

```bash
docker ps -a
```

---

### Display Application Logs

Shows container logs.

```bash
docker logs node-container
```

Useful for troubleshooting startup issues.

---

### Test Application

```bash
curl --fail http://localhost:3000
```

The workflow fails if the application is not reachable.

---

### Cleanup

Stops and removes the Docker container.

```bash
docker stop node-container
docker rm node-container
```

Runs even if previous steps fail.

---

# Continuous Deployment (CD)

Workflow file:

```text
.github/workflows/cd.yml
```

---

## Trigger

The deployment workflow executes whenever a version tag matching `v*` is pushed.

Examples:

```
v1.0.0
v1.1.0
v2.0.0
```

---

# CD Pipeline Steps

## 1. Checkout Repository

Checks out the tagged source code.

---

## 2. Extract Release Version

Example:

```
Tag:
v1.2.0

Version:
1.2.0
```

Stored as:

```
steps.version.outputs.VERSION
```

---

## 3. Login to Docker Hub

Uses the following GitHub Secrets:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

---

## 4. Build Docker Image

Example image:

```
sujanvishnumolakala/nodejs-app:1.2.0
```

---

## 5. Push Docker Image

Publishes the versioned Docker image to Docker Hub.

Example:

```bash
docker push sujanvishnumolakala/nodejs-app:1.2.0
```

---

## 6. Clone Deployment Repository

The deployment repository is cloned using a GitHub Personal Access Token.

Repository:

```
nodejs-app-deploy
```

---

## 7. Update Docker Compose

Automatically replaces the image tag in:

```yaml
docker-compose.yml
```

with:

```yaml
image: sujanvishnumolakala/nodejs-app:<version>
```

using:

```bash
sed
```

---

## 8. Commit Changes

Creates a commit similar to:

```
Update nodejs-app image version to 1.2.0
```

If there are no changes, the workflow continues successfully.

---

## 9. Push Deployment Repository

Pushes the updated deployment configuration to the deployment repository.

Deployment tools such as Docker Compose, Portainer, or Watchtower can then pull the latest image automatically.

---

# Required GitHub Secrets

| Secret | Purpose |
|---------|---------|
| DOCKER_USERNAME | Docker Hub username |
| DOCKER_PASSWORD | Docker Hub password or access token |
| DEPLOY_TOKEN | GitHub Personal Access Token for deployment repository |

---

# CodeQL Requirements

This workflow performs CodeQL analysis using:

```yaml
- uses: github/codeql-action/analyze@v3
```

To successfully use CodeQL:

- Ensure the GitHub repository is **Public**, or
- Use a GitHub plan that includes **GitHub Advanced Security** for private repositories.

After successful execution, CodeQL findings are available under:

```text
Repository
└── Security
    └── Code scanning alerts
```

---

# Versioning

Create a release by pushing a version tag.

Example:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Deployment flow:

```text
Version Tag
      │
      ▼
Checkout Repository
      ▼
Build Docker Image
      ▼
Push Docker Image
      ▼
Update Deployment Repository
      ▼
Deploy Latest Version
```

---

# Technologies Used

- Node.js
- JavaScript
- GitHub Actions
- CodeQL
- Docker
- Docker Hub
- Git
- Docker Compose

---

# Repository Structure

```text
.
├── .github
│   └── workflows
│       ├── ci.yml
│       └── cd.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── src/
└── README.md
```

---

# Workflow Summary

```text
Push / Pull Request
          │
          ▼
      CI Workflow
          │
          ├── CodeQL Security Scan
          │      ├── Checkout
          │      ├── Initialize CodeQL
          │      └── Analyze
          │
          └── Docker Build & Test
                 ├── Checkout
                 ├── Build Image
                 ├── Run Container
                 ├── Verify Container
                 ├── View Logs
                 ├── Test Application
                 └── Cleanup
                      │
                      ▼
                Version Tag (v*)
                      │
                      ▼
                 CD Workflow
                      │
                      ├── Checkout Repository
                      ├── Get Version
                      ├── Docker Login
                      ├── Docker Build
                      ├── Docker Push
                      ├── Clone Deploy Repository
                      ├── Update docker-compose.yml
                      ├── Commit Changes
                      └── Push Changes
```

---

# Result

This pipeline provides:

- Automated CI on every push and pull request
- Static Application Security Testing (SAST) using CodeQL
- Automated Docker image build and validation
- Container health verification
- Automated Docker Hub image publishing
- Automatic deployment repository updates
- GitOps-style deployment workflow
