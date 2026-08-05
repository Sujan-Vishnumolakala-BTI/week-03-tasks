#!/bin/bash

set -e


echo "Starting CI"


echo "Running tests inside Docker"


docker run --rm \
-v "$(pwd)":/app \
-w /app \
node:20-alpine \
sh -c "npm install && npm test"



echo "Building Docker image"


docker build \
-t nodejs-app:latest .



echo "Starting container"


docker run -d \
--name node-test \
-p 3000:3000 \
nodejs-app:latest



sleep 5


echo "Testing application"


curl http://localhost:3000



docker stop node-test

docker rm node-test



echo "CI Completed"