# Python Calculator – CI/CD Pipeline

This project uses **GitHub Actions** to automate Continuous Integration (CI) and Continuous Deployment (CD) for a Python Calculator application. The pipeline performs source code checkout, dependency installation, unit testing, CodeQL security analysis, Docker image creation, and automated deployment updates.

---

# CI/CD Architecture

```text
Developer
    │
    │ Push to main/master
    │ or Create Version Tag (v1.0.0)
    ▼
GitHub Repository
    │
    ├────────────── CI Workflow ───────────────┐
    │                                          │
    ▼                                          │
Checkout Repository                            │
    ▼                                          │
Initialize CodeQL                              │
    ▼                                          │
Setup Python 3.12                              │
    ▼                                          │
Install Dependencies                           │
    ▼                                          │
Run Unit Tests                                 │
    ▼                                          │
Perform CodeQL Analysis                        │
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

The CI workflow runs on:

- Push to `main`
- Push to `master`
- Pull Request targeting `main`
- Pull Request targeting `master`
- Scheduled execution every Monday at 03:00 UTC

```yaml
on:
  push:
    branches:
      - main
      - master

  pull_request:
    branches:
      - main
      - master

  schedule:
    - cron: '0 3 * * 1'
```

---

## Workflow Permissions

```yaml
permissions:
  actions: read
  contents: read
  security-events: write
```

| Permission | Purpose |
|------------|---------|
| contents: read | Checkout repository |
| actions: read | Read workflow metadata |
| security-events: write | Upload CodeQL results |

---

## CI Pipeline Steps

### 1. Checkout Repository

```yaml
uses: actions/checkout@v4
```

Downloads the project source code.

---

### 2. Initialize CodeQL

```yaml
uses: github/codeql-action/init@v3
```

Configured for:

- Python

---

### 3. Setup Python

```yaml
uses: actions/setup-python@v5
```

Configuration:

- Python 3.12

---

### 4. Install Dependencies

```bash
python -m pip install --upgrade pip
```

Upgrades the latest version of pip before running the application.

---

### 5. Run Unit Tests

```bash
python -m unittest discover
```

Automatically discovers and executes all unit tests.

---

### 6. Perform CodeQL Analysis

```yaml
uses: github/codeql-action/analyze@v3
```

Performs Static Application Security Testing (SAST) and uploads results to GitHub Security.

---

## Optional Docker Build

A Docker build job is included in the workflow but is currently commented out.

To enable it, uncomment the following section in `ci.yml`:

```yaml
docker:
  name: Docker Build
```

This job builds the Docker image after successful CodeQL analysis.

---

# Continuous Deployment (CD)

Workflow file:

```text
.github/workflows/cd.yml
```

---

## Trigger

The CD workflow executes whenever a version tag matching `v*` is pushed.

Example:

```
v1.0.0
v1.2.5
v2.0.1
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
sujanvishnumolakala/python-calculator:1.2.0
```

---

## 5. Push Docker Image

Publishes the versioned Docker image to Docker Hub.

Example:

```bash
docker push sujanvishnumolakala/python-calculator:1.2.0
```

---

## 6. Clone Deployment Repository

The deployment repository is cloned using a GitHub Personal Access Token.

Repository:

```
python-calculator-deploy
```

---

## 7. Update Docker Compose

Automatically replaces the image tag in:

```yaml
docker-compose.yml
```

with:

```yaml
image: sujanvishnumolakala/python-calculator:<version>
```

using:

```bash
sed
```

---

## 8. Commit Changes

Creates a commit similar to:

```
Update calculator image version to 1.2.0
```

If there are no changes, the workflow continues successfully.

---

## 9. Push Deployment Repository

Pushes the updated deployment configuration to the deployment repository.

Deployment platforms such as Docker Compose, Portainer, or Watchtower can then pull the latest image automatically.

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

```
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
Checkout Source
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

- Python 3.12
- GitHub Actions
- CodeQL
- unittest
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
├── tests
├── Dockerfile
├── requirements.txt
├── calculator.py
└── README.md
```

---

# Workflow Summary

```text
Push / Pull Request / Schedule
              │
              ▼
        CI Workflow
              │
              ├── Checkout Repository
              ├── Initialize CodeQL
              ├── Setup Python
              ├── Install Dependencies
              ├── Run Unit Tests
              └── CodeQL Analysis
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
- Scheduled weekly security analysis
- Automated Python unit testing
- Static Application Security Testing (SAST) using CodeQL
- Versioned Docker image creation
- Docker Hub image publishing
- Automated deployment repository updates
- GitOps-style deployment workflow