# Sonatype Nexus 3 Docker Registry Setup

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
```