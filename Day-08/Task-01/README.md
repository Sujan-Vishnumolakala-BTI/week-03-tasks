# Clone Private GitHub Repository Using Ubuntu Docker Container

## Overview

This guide explains how to:

- Create an Ubuntu Docker image with Git installed.
- Run an Ubuntu container locally.
- Use a GitHub Fine-Grained Personal Access Token.
- Clone a private GitHub repository.
- Run `git fetch` and `git pull` inside the container.

---

# Folder Structure

Create a folder:

```
github-private-docker/
│
└── Dockerfile
```

---

# 1. Create Dockerfile

Create a file named:

```
Dockerfile
```

Add the following content:

```dockerfile
FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    git \
    ca-certificates \
    curl \
    vim && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["/bin/bash"]
```

---

# 2. Build Docker Image

Navigate to the Dockerfile location:

```bash
cd github-private-docker
```

Build the image:

```bash
docker build -t private-git-machine .
```

Verify image:

```bash
docker images
```

Expected:

```
REPOSITORY              TAG
private-git-machine     latest
```

---

# 3. Run Ubuntu Docker Container

Start the container:

```bash
docker run -it \
--name private-git-container \
private-git-machine
```

You will enter:

```
root@container_id:/workspace#
```

---

# 4. Verify Git Installation

Inside the container:

```bash
git --version
```

Example:

```
git version 2.43.0
```

---

# 5. Configure GitHub Fine-Grained Token

Create a GitHub Fine-Grained Personal Access Token.

Required permissions:

```
Repository access:
    Only select repositories

Repository permissions:
    Contents -> Read-only
```

Select repository:

```
github-actions-demo-private
```

---

# 6. Export GitHub Token Inside Container

Inside Ubuntu container:

```bash
export GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
```

Example:

```bash
export GITHUB_TOKEN="github_pat_xxxxxxxxxxxxxxxxx"
```

Verify:

```bash
echo $GITHUB_TOKEN
```

---

# 7. Clone Private Repository

Repository:

```
https://github.com/Sujan-Vishnumolakala-BTI/github-actions-demo-private.git
```

Clone:

```bash
git clone https://${GITHUB_TOKEN}@github.com/Sujan-Vishnumolakala-BTI/github-actions-demo-private.git
```

Expected:

```
Cloning into 'github-actions-demo-private'...
Receiving objects: 100%
```

---

# 8. Enter Repository

```bash
cd github-actions-demo-private
```

List files:

```bash
ls
```

Example:

```
README.md
.github
```

---

# 9. Check Current Branch

```bash
git branch
```

Expected:

```
* main
```

---

# 10. Check Remote Repository

```bash
git remote -v
```

Example:

```
origin  https://github.com/Sujan-Vishnumolakala-BTI/github-actions-demo-private.git (fetch)
origin  https://github.com/Sujan-Vishnumolakala-BTI/github-actions-demo-private.git (push)
```

---

# 11. Fetch Latest Changes

Run:

```bash
git fetch origin
```

Example:

```
From github.com:Sujan-Vishnumolakala-BTI/github-actions-demo-private
   abc123..def456  main -> origin/main
```

---

# 12. Pull Latest Code

```bash
git pull origin main
```

---

# Useful Git Commands

## Check Status

```bash
git status
```

## View Commit History

```bash
git log --oneline
```

## View All Branches

```bash
git branch -a
```

## Check Current Remote

```bash
git remote -v
```

---

# Container Management Commands

## Exit Container

```bash
exit
```

## Restart Existing Container

```bash
docker start -ai private-git-container
```

## Stop Container

```bash
docker stop private-git-container
```

## Remove Container

```bash
docker rm -f private-git-container
```

## Remove Image

```bash
docker rmi private-git-machine
```

---

# Complete Flow

```
Local Machine
      |
      |
docker build
      |
      v
Ubuntu Docker Image
      |
      |
docker run
      |
      v
Ubuntu Container
      |
      |
Install Git
      |
      |
Set GitHub Token
      |
      |
git clone private repository
      |
      |
git fetch origin
      |
      |
git pull origin main
```

---

# Security Notes

- Never commit GitHub tokens.
- Do not store tokens inside Docker images.
- Use read-only permissions for cloning repositories.
- Revoke tokens if exposed.