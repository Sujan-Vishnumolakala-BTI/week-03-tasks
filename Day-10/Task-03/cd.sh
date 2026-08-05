#!/bin/bash

set -e


IMAGE="sujanvishnumolakala/nodejs-app-local-runner"


VERSION=$1


if [ -z "$VERSION" ]

then

echo "Provide version"

exit 1

fi



docker login



docker build -t $IMAGE:$VERSION .



docker push $IMAGE:$VERSION


echo "CD Completed"