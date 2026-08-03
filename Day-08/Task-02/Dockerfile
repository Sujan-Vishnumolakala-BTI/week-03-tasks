FROM alpine:3.22

# Install Git, CA certificates, OpenJDK 21 and Maven
RUN apk update && \
    apk add --no-cache \
        git \
        ca-certificates \
        openjdk21 \
        maven

# Verify installations
RUN git --version && \
    java -version && \
    mvn -version

WORKDIR /workspace

# Clone the private Java CRUD repository
RUN --mount=type=secret,id=github_token \
    TOKEN=$(cat /run/secrets/github_token) && \
    git clone https://${TOKEN}@github.com/Sujan-Vishnumolakala-BTI/java-crud-demo.git

# Move to project directory
WORKDIR /workspace/java-crud-demo

# Checkout main branch
RUN git checkout main

# Build the project
RUN mvn clean package -DskipTests

# Verify JAR creation
RUN echo "Generated JAR:" && \
    find target -name "*.jar"

CMD ["/bin/sh"]