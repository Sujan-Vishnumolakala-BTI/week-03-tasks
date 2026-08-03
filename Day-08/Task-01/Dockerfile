# # syntax=docker/dockerfile:1.7

# FROM ubuntu:24.04

# RUN apt-get update && \
#     apt-get install -y git ca-certificates && \
#     rm -rf /var/lib/apt/lists/*

# ARG REPO_OWNER
# ARG REPO_NAME
# ARG BRANCH=main

# WORKDIR /workspace

# RUN --mount=type=secret,id=github_token \
#     TOKEN=$(cat /run/secrets/github_token) && \
#     git clone https://${TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git && \
#     cd ${REPO_NAME} && \
#     git checkout ${BRANCH}

# CMD ["/bin/bash"]

FROM ubuntu:24.04

# Install git and certificates
RUN apt-get update && \
    apt-get install -y git ca-certificates vim curl && \
    rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /workspace

# Keep container running with bash
CMD ["/bin/bash"]