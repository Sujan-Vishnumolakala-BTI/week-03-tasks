# Docker Volume Image Push Demo

A simple Python + Docker project that copies images into a Docker named volume mounted at:

```
/uploads
```

The Docker volume persists even after the container stops.

The complete Docker workflow is automated through:

```
python run.py
```

---

# Project Structure

```
docker-volume-demo/

│
├── uploads/
│   ├── image1.png
│   ├── image2.jpg
│   └── image3.jpeg
│
├── app.py
├── Dockerfile
├── run.py
└── .dockerignore
```

---

# Requirements

Install:

- Python 3.10+
- Docker Desktop / Docker Engine

Verify Python:

```powershell
python --version
```

Verify Docker:

```powershell
docker --version
```

Make sure Docker Desktop is running.

---

# Application Flow

```
run.py
   |
   |
   +---- Create Docker Volume
   |
   +---- Build Docker Image
   |
   +---- Run Container
              |
              |
              +---- Execute app.py
                        |
                        |
                        +---- Copy images
                              |
                              |
                              v

                         /uploads

                              |
                              |
                              v

                     Docker Named Volume
```

---

# Docker Volume

The application uses a named volume:

```
shared-images
```

The volume is mounted inside the container:

```
shared-images:/uploads
```

Anything written to:

```
/uploads
```

is stored permanently.

---

# Files

## app.py

Application running inside the container.

Purpose:

- Reads images from the application folder.
- Copies images into `/uploads`.

Example:

```python
SOURCE_DIR = "uploads"

DEST_DIR = "/uploads"
```

---

## Dockerfile

Creates the Docker image.

Example:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app.py .

COPY uploads uploads

CMD ["python", "app.py"]
```

---

## run.py

Automation script.

It performs:

1. Create Docker volume.
2. Build Docker image.
3. Start Docker container.
4. Mount volume.
5. Execute image copy process.

---

# First Time Setup

Open PowerShell.

Go to project folder:

```powershell
cd "C:\Users\SujanVishnumolakala\OneDrive - BMW Techworks India Private Limited\BTI TRAINING\docker-volume-demo"
```

---

# Create Python Environment (Optional)

Create virtual environment:

```powershell
python -m venv venv
```

Activate:

```powershell
.\venv\Scripts\activate
```

---

# Install Dependencies

Install Docker Python SDK:

```powershell
pip install docker
```

---

# Docker Login (Optional)

Only required if using Docker Hub/private registry:

```powershell
docker login
```

For this local volume example, Docker login is not required.

---

# Run Application

Execute only:

```powershell
python run.py
```

Example output:

```
Creating volume...

Building Docker image...

Running container...

Copied image1.png
Copied image2.jpg
Copied image3.jpeg

Completed successfully
```

---

# Run Again

Run:

```powershell
python run.py
```

again.

The same Docker volume will be reused:

```
shared-images
```

Existing images remain available.

---

# Check Docker Volume

List volumes:

```powershell
docker volume ls
```

Example:

```
DRIVER    VOLUME NAME

local     shared-images
```

---

# Check Uploaded Images

View files inside volume:

```powershell
docker run --rm `
-v shared-images:/data `
alpine `
ls -l /data
```

Expected:

```
image1.png
image2.jpg
image3.jpeg
```

---

# Inspect Volume Details

```powershell
docker volume inspect shared-images
```

Example output:

```json
[
    {
        "Name": "shared-images",
        "Driver": "local"
    }
]
```

---

# Container Commands

List running containers:

```powershell
docker ps
```

List all containers:

```powershell
docker ps -a
```

---

# Docker Image Commands

List images:

```powershell
docker images
```

Remove image:

```powershell
docker rmi image-pusher
```

---

# Cleanup

Remove Docker volume:

```powershell
docker volume rm shared-images
```

Remove unused Docker resources:

```powershell
docker system prune
```

---

# Important Notes

## Persistent Storage

The container is temporary.

The Docker volume is permanent.

```
Container
    |
    |
    X Deleted after execution


Volume
    |
    |
    ✓ Data remains
```

---

## Multiple Runs

Example:

First execution:

```
python run.py
```

Creates:

```
shared-images

image1.png
image2.jpg
```

Second execution:

```
python run.py
```

Uses the same:

```
shared-images
```

No data loss.

---

# Summary

Command to execute the complete workflow:

```powershell
python run.py
```

This will:

✅ Create Docker volume  
✅ Build Docker image  
✅ Start container  
✅ Mount `/uploads`  
✅ Copy images  
✅ Persist data between runs  