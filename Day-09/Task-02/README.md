# Spring Boot CRUD Application – CI/CD Pipeline

This project uses **GitHub Actions** to automatically build, package, scan, and deploy a Spring Boot CRUD application.

## CI/CD Architecture

```text
Developer
    │
    │ Push to main / Create version tag (v1.0.0)
    ▼
GitHub Repository
    │
    ├─────────────── CI Workflow ────────────────┐
    │                                            │
    ▼                                            │
Checkout Source                                  │
    ▼                                            │
Setup Java 21                                    │
    ▼                                            │
Initialize CodeQL                                │
    ▼                                            │
CodeQL Autobuild                                 │
    ▼                                            │
Maven Package (Skip Tests)                       │
    ▼                                            │
Generate Spring Boot JAR                         │
    ▼                                            │
Upload Build Artifact                            │
    │                                            │
    └──────────── workflow_run ──────────────────┘
                         │
                         ▼
                CD Workflow Trigger
                         │
                         ▼
               Download Build Artifact
                         ▼
                Extract Release Version
                         ▼
                Docker Hub Login
                         ▼
                Build Docker Image
                         ▼
                 Trivy Image Scan
                         ▼
                Push Docker Image
                         ▼
         Clone Deployment Repository
                         ▼
      Update docker-compose.yml Image Tag
                         ▼
          Commit & Push Deployment Repo
```

---

# Continuous Integration (CI)

Workflow file:

```
.github/workflows/ci.yml
```

## Trigger Events

The CI workflow runs when:

- Push to `main`
- Push of version tags (`v*`)
- Pull Request to `main`
- Manual execution (`workflow_dispatch`)

```yaml
on:
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

---

## Workflow Permissions

```yaml
permissions:
  contents: read
  security-events: write
  actions: read
```

| Permission | Purpose |
|------------|---------|
| contents: read | Checkout repository |
| security-events: write | Upload CodeQL results |
| actions: read | Read workflow artifacts |

---

## CI Pipeline Steps

### 1. Checkout Source

```yaml
uses: actions/checkout@v4
```

Downloads repository source code.

---

### 2. Setup Java

```yaml
uses: actions/setup-java@v4
```

Configuration:

- Java 21
- Temurin distribution
- Maven dependency cache

---

### 3. Initialize CodeQL

```yaml
uses: github/codeql-action/init@v4
```

Configured for:

- Java
- Kotlin
- Security Extended Queries

---

### 4. CodeQL Autobuild

```yaml
uses: github/codeql-action/autobuild@v4
```

Automatically compiles the project for static code analysis.

---

### 5. Build Spring Boot Application

```bash
mvn clean package -DskipTests
```

Produces:

```
target/
    app.jar
```

---

### 6. Display Generated JAR

Lists generated JAR files.

```bash
find target -name "*.jar"
```

---

### 7. Upload Build Artifact

```yaml
uses: actions/upload-artifact@v4
```

Artifact name:

```
spring-boot-jar
```

Excluded:

- original JAR
- sources JAR
- javadoc JAR

Retention:

```
30 Days
```

---

# Continuous Deployment (CD)

Workflow file:

```
.github/workflows/cd.yml
```

---

## Trigger

The deployment workflow is triggered automatically after the CI workflow completes successfully.

```yaml
workflow_run:
```

---

## Deployment Condition

Deployment occurs only when:

- CI succeeds
- Branch/tag starts with `v`

```yaml
if:
  success &&
  startsWith(head_branch, 'v')
```

Example:

```
v1.0.0
v1.2.4
v2.0.1
```

---

# CD Pipeline

## 1. Checkout Repository

Checks out the exact commit built by the CI workflow.

---

## 2. Download Build Artifact

Downloads

```
spring-boot-jar
```

generated during CI.

---

## 3. Verify Artifact

```bash
ls -lah artifact
```

Confirms the JAR exists before Docker image creation.

---

## 4. Extract Version

Example:

```
Tag:
v1.3.0

Version:
1.3.0
```

Stored as

```
steps.version.outputs.VERSION
```

---

## 5. Login to Docker Hub

Uses GitHub Secrets.

```text
DOCKER_USERNAME
DOCKER_PASSWORD
```

---

## 6. Build Docker Image

Example image:

```
sujanvishnumolakala/spring-crud-java:1.3.0
```

---

## 7. Scan Docker Image

Uses

```
Trivy
```

Configuration:

- HIGH
- CRITICAL

If vulnerabilities are found:

```
Deployment fails
```

---

## 8. Push Docker Image

Pushes the versioned image to Docker Hub.

Example:

```
docker push sujanvishnumolakala/spring-crud-java:1.3.0
```

---

## 9. Clone Deployment Repository

The deployment repository is cloned using a GitHub Personal Access Token.

Repository example:

```
spring-crud-java-deploy
```

---

## 10. Update Docker Compose

Automatically replaces

```yaml
image:
```

with

```yaml
image: sujanvishnumolakala/spring-crud-java:<version>
```

using

```bash
sed
```

---

## 11. Commit Changes

Commits updated deployment configuration.

Example commit:

```
Update image version to 1.3.0
```

---

## 12. Push Deployment Repository

Pushes updated deployment configuration.

Deployment tools (for example Docker Compose, Portainer, or Watchtower) can then pull the latest image.

---

# Required GitHub Secrets

| Secret | Purpose |
|---------|---------|
| DOCKER_USERNAME | Docker Hub username |
| DOCKER_PASSWORD | Docker Hub password or access token |
| DEPLOY_TOKEN | GitHub Personal Access Token for deployment repository |

---

# Versioning

Release by creating a version tag.

Example:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Pipeline:

```
Tag
   ↓
CI Build
   ↓
Artifact Upload
   ↓
CD Trigger
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
Docker Push
   ↓
Deployment Repository Update
```

---

# Technologies Used

- Java 21
- Spring Boot
- Maven
- GitHub Actions
- CodeQL
- Docker
- Docker Hub
- Trivy
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
├── src
├── target
├── Dockerfile
├── pom.xml
└── README.md
```

---

# Workflow Summary

```text
Push / Tag
     │
     ▼
CI Workflow
     │
     ├── Checkout
     ├── Setup Java
     ├── CodeQL Init
     ├── Autobuild
     ├── Maven Package
     ├── Generate JAR
     └── Upload Artifact
               │
               ▼
        workflow_run
               │
               ▼
CD Workflow
     │
     ├── Download Artifact
     ├── Get Version
     ├── Docker Login
     ├── Docker Build
     ├── Trivy Scan
     ├── Docker Push
     ├── Clone Deploy Repository
     ├── Update Compose File
     ├── Commit
     └── Push
```

---

# Result

This pipeline provides:

- Automated builds on every change
- Static application security analysis with CodeQL
- Maven packaging
- Artifact storage between workflows
- Versioned Docker image creation
- Container vulnerability scanning using Trivy
- Automated Docker Hub publishing
- Automatic deployment repository updates
- GitOps-style deployment workflow
---

# Notes

## CodeQL Requirements

The workflow is configured to initialize and autobuild CodeQL, but the analysis step is currently commented out.

To enable CodeQL scanning:

1. Make sure the GitHub repository is **Public** (or that your GitHub plan supports CodeQL for private repositories).
2. Uncomment the following step in `.github/workflows/ci.yml`:

```yaml
- name: Perform CodeQL analysis
  uses: github/codeql-action/analyze@v4
```

Once enabled, the workflow will:
- Perform static application security testing (SAST)
- Upload security findings to the **GitHub Security** tab
- Display CodeQL alerts under **Security → Code scanning alerts**

> **Note:** GitHub provides CodeQL scanning for all public repositories. Private repositories require GitHub Advanced Security or an eligible GitHub plan that includes CodeQL.