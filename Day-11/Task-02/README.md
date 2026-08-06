<!-- # Sonatype Nexus 3 Docker Registry Setup

## 1. Run Nexus Container

```bash
docker run -d -p 8081:8081 -p 5000:5000 --name nexus -v nexus-data:/nexus-data sonatype/nexus3
```

Check container:

```bash
docker ps -a
```

---

## 2. Check Nexus Startup

```bash
docker logs -f nexus
```

Wait until:

```
Started Sonatype Nexus Repository Manager
```

Press:

```
CTRL + C
```

---

## 3. Get Admin Password

```bash
docker exec -it nexus cat /nexus-data/admin.password
```

Copy the password.

---

## 4. Open Nexus

URL:

```
http://localhost:8081
```

Login:

```
Username: admin
Password: <password-from-command>
```

Complete the onboarding wizard and accept EULA.

---

## 5. Enable Docker Bearer Token Realm

Nexus UI:

```
Administration
    |
    └── Security
          |
          └── Realms
```

Move:

```
Docker Bearer Token Realm
```

to Active.

Save.

---

## 6. Create Docker Hosted Repository

Nexus UI:

```
Administration
    |
    └── Repositories
          |
          └── Create repository
```

Select:

```
docker (hosted)
```

Configure:

```
Name:
docker-hosted

HTTP Port:
5000

Online:
Enabled
```

Save.

---

## 7. Configure Docker HTTP Registry

Docker Desktop:

```
Settings
   |
   └── Docker Engine
```

Add:

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "insecure-registries": [
    "localhost:5000"
  ]
}
```

Click:

```
Apply & Restart
```

---

## 8. Verify Nexus Docker Registry

Run:

```bash
curl http://localhost:5000/v2/
```

Expected:

```json
{"errors":[{"code":"UNAUTHORIZED","message":"authentication required"}]}
```

---

## 9. Login Docker Registry

```bash
docker login localhost:5000
```

Enter:

```
Username:
admin

Password:
<Nexus admin password>
```

Expected:

```
Login Succeeded
```

---

## 10. Push Docker Image

Download image:

```bash
docker pull nginx
```

Tag:

```bash
docker tag nginx localhost:5000/nginx
```

Push:

```bash
docker push localhost:5000/nginx
```

---

## 11. Pull Docker Image

Remove local image:

```bash
docker rmi localhost:5000/nginx
```

Pull from Nexus:

```bash
docker pull localhost:5000/nginx
```

---

## 12. Check Images in Nexus

Open:

```
http://localhost:8081
```

Navigate:

```
Browse
   |
   └── docker-hosted
```

---

## 13. Check Images Using API

List images:

```bash
curl -u admin:<password> http://localhost:5000/v2/_catalog
```

Example:

```json
{
  "repositories": [
    "nginx"
  ]
}
```

Check tags:

```bash
curl -u admin:<password> http://localhost:5000/v2/nginx/tags/list
```

---

## 14. Nexus Management Commands

Stop Nexus:

```bash
docker stop nexus
```

Start Nexus:

```bash
docker start nexus
```

Restart Nexus:

```bash
docker restart nexus
```

Logs:

```bash
docker logs -f nexus
```

Remove Nexus container:

```bash
docker rm -f nexus
```

Remove Nexus data:

```bash
docker volume rm nexus-data
```

---

## Final URLs

Nexus UI:

```
http://localhost:8081
```

Docker Registry:

```
localhost:5000
```

Docker Image Format:

```
localhost:5000/<image-name>:<tag>
```

Example:

```
localhost:5000/nginx:latest
``` -->

# Sonatype Nexus 3 Docker Registry Setup

This document explains how to install Sonatype Nexus Repository Manager 3 using Docker, configure it as a Docker Registry, and push/pull Docker images.

---

# 1. Run Nexus Container

Start Nexus using Docker:

```bash
docker run -d \
-p 8081:8081 \
-p 5000:5000 \
--name nexus \
-v nexus-data:/nexus-data \
sonatype/nexus3
```

Check container status:

```bash
docker ps -a
```

Expected:

```
STATUS: Up

PORTS:
8081->8081
5000->5000
```

---

# 2. Check Nexus Startup

View Nexus logs:

```bash
docker logs -f nexus
```

Wait until:

```
Started Sonatype Nexus Repository Manager
```

Exit logs:

```
CTRL + C
```

---

# 3. Get Nexus Admin Password

Get the generated admin password:

```bash
docker exec -it nexus cat /nexus-data/admin.password
```

Copy the password.

---

# 4. Open Nexus Web UI

Open:

```
http://localhost:8081
```

Login:

```
Username:
admin

Password:
<password-from-command>
```

---

# 5. Accept Nexus EULA Using REST API

Install jq:

```bash
sudo apt update
sudo apt install jq -y
```

Set Nexus credentials:

```bash
export NEXUS_USER=admin
export NEXUS_PASSWORD=<your-password>
export NEXUS_URL=http://localhost:8081
```

Check EULA status:

```bash
curl -u "$NEXUS_USER:$NEXUS_PASSWORD" \
$NEXUS_URL/service/rest/v1/system/eula
```

Get EULA disclaimer:

```bash
DISCLAIMER=$(curl -s \
-u "$NEXUS_USER:$NEXUS_PASSWORD" \
$NEXUS_URL/service/rest/v1/system/eula | jq -r .disclaimer)
```

Accept EULA:

```bash
curl -X POST \
-u "$NEXUS_USER:$NEXUS_PASSWORD" \
-H "Content-Type: application/json" \
$NEXUS_URL/service/rest/v1/system/eula \
-d "{\"accepted\":true,\"disclaimer\":\"$DISCLAIMER\"}"
```

Verify EULA acceptance:

```bash
curl -u "$NEXUS_USER:$NEXUS_PASSWORD" \
$NEXUS_URL/service/rest/v1/system/eula
```

Expected:

```json
{
  "accepted": true
}
```

---

# 6. Enable Docker Bearer Token Realm

Open Nexus UI:

```
Administration
    |
    └── Security
          |
          └── Realms
```

Move:

```
Docker Bearer Token Realm
```

from Available to Active.

Save changes.

---

# 7. Create Docker Hosted Repository

In Nexus UI:

```
Administration
    |
    └── Repositories
          |
          └── Create repository
```

Select:

```
docker (hosted)
```

Configure:

```
Name:
docker-hosted

HTTP Port:
5000

Online:
Enabled
```

Save repository.

---

# 8. Configure Docker HTTP Registry

Docker normally uses HTTPS.

Since Nexus is configured with HTTP, add insecure registry.

Open:

```
Docker Desktop
    |
    └── Settings
          |
          └── Docker Engine
```

Update configuration:

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "insecure-registries": [
    "localhost:5000"
  ]
}
```

Click:

```
Apply & Restart
```

---

# 9. Verify Nexus Docker Registry

Check Docker Registry endpoint:

```bash
curl http://localhost:5000/v2/
```

Expected response:

```json
{
  "errors": [
    {
      "code": "UNAUTHORIZED",
      "message": "authentication required"
    }
  ]
}
```

This means the registry is working.

---

# 10. Login Docker Registry

Login:

```bash
docker login localhost:5000
```

Enter:

```
Username:
admin

Password:
<Nexus admin password>
```

Expected:

```
Login Succeeded
```

---

# 11. Push Docker Image to Nexus

Download test image:

```bash
docker pull nginx
```

Tag image:

```bash
docker tag nginx localhost:5000/nginx:latest
```

Push image:

```bash
docker push localhost:5000/nginx:latest
```

Expected:

```
pushed successfully
```

---

# 12. Pull Docker Image From Nexus

Remove local image:

```bash
docker image remove localhost:5000/nginx:latest
```

Pull from Nexus:

```bash
docker pull localhost:5000/nginx:latest
```

---

# 13. Check Images in Nexus UI

Open:

```
http://localhost:8081
```

Navigate:

```
Browse
   |
   └── docker-hosted
```

You should see:

```
nginx
 └── latest
```

---

# 14. Check Images Using Docker Registry API

List repositories:

```bash
curl -u admin:<password> \
http://localhost:5000/v2/_catalog
```

Example response:

```json
{
  "repositories": [
    "nginx"
  ]
}
```

---

Check image tags:

```bash
curl -u admin:<password> \
http://localhost:5000/v2/nginx/tags/list
```

Example response:

```json
{
  "name": "nginx",
  "tags": [
    "latest"
  ]
}
```

---

# 15. Nexus Management Commands

Check Nexus container:

```bash
docker ps
```

View logs:

```bash
docker logs -f nexus
```

Restart Nexus:

```bash
docker restart nexus
```

Check Nexus status:

```bash
curl http://localhost:8081/service/rest/v1/status
```

---

# Final Configuration

## Nexus Web UI

```
http://localhost:8081
```

## Docker Registry

```
localhost:5000
```

## Login

```
Username:
admin

Password:
<Nexus admin password>
```

## Docker Image Format

```
localhost:5000/<image-name>:<tag>
```

Example:

```
localhost:5000/nginx:latest
```

---

# Complete Flow

```
Docker Client
      |
      |
      v
localhost:5000
      |
      |
      v
Nexus Docker Hosted Repository
      |
      |
      v
docker-hosted
      |
      |
      v
Stored Docker Images
```