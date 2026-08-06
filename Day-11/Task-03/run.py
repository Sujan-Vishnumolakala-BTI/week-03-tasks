import subprocess
import sys

IMAGE_NAME = "image-pusher"
CONTAINER_NAME = "image-copy-container"
VOLUME_NAME = "shared-images"


def run_command(command, message):
    print(f"\n{message}")

    try:
        subprocess.run(command, check=True)
        print("[SUCCESS]")

    except subprocess.CalledProcessError:
        print("[FAILED]")
        sys.exit(1)


print("=" * 70)
print(" DOCKER IMAGE COPY RUNNER ")
print("=" * 70)

##############################################################
# STEP 1
##############################################################

run_command(
    ["docker", "--version"],
    "Checking Docker installation..."
)

##############################################################
# STEP 2
##############################################################

run_command(
    ["docker", "info"],
    "Checking Docker daemon..."
)

##############################################################
# STEP 3
##############################################################

print("\nChecking Docker Login...")

result = subprocess.run(
    ["docker", "info"],
    capture_output=True,
    text=True
)

if "Username:" in result.stdout:
    print("[SUCCESS] Docker Login Found")
else:
    print("[WARNING] Docker login not found.")
    print("If you need Docker Hub access, run:")
    print("docker login")

##############################################################
# STEP 4
##############################################################

run_command(
    [
        "docker",
        "volume",
        "create",
        VOLUME_NAME
    ],
    f"Creating Volume ({VOLUME_NAME})..."
)

##############################################################
# STEP 5
##############################################################

run_command(
    [
        "docker",
        "build",
        "-t",
        IMAGE_NAME,
        "."
    ],
    "Building Docker Image..."
)

##############################################################
# STEP 6
##############################################################

print("\nRemoving old container if exists...")

subprocess.run(
    [
        "docker",
        "rm",
        "-f",
        CONTAINER_NAME
    ],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL
)

##############################################################
# STEP 7
##############################################################

run_command(
    [
        "docker",
        "run",
        "--name",
        CONTAINER_NAME,
        "--rm",
        "-v",
        f"{VOLUME_NAME}:/uploads",
        IMAGE_NAME
    ],
    "Starting Container..."
)

##############################################################
# STEP 8
##############################################################

print("\n")
print("=" * 70)
print("APPLICATION COMPLETED SUCCESSFULLY")
print("=" * 70)