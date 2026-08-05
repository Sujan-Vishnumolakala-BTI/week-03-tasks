# Use the official Python image
FROM python:3.12-slim

# Prevent Python from buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy application files
COPY calculator.py .
COPY gui.py .

# Run the application
CMD ["python", "gui.py"]