import os
import shutil
from pathlib import Path

SOURCE_DIR = Path("/app/uploads")
DEST_DIR = Path("/uploads")

DEST_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"]

print("=" * 60)
print("IMAGE COPY SERVICE")
print("=" * 60)

copied = 0

for file in SOURCE_DIR.iterdir():

    if file.suffix.lower() in IMAGE_EXTENSIONS:

        destination = DEST_DIR / file.name

        shutil.copy2(file, destination)

        print(f"[SUCCESS] {file.name}")

        copied += 1

print("-" * 60)
print(f"Images Copied : {copied}")
print("-" * 60)