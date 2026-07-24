# Local File Server (localhost:8000)

This project hosts sample files (MP4, MP3, PDF, and Word documents) using a simple local HTTP server so they can be accessed through a web browser or any HTTP client.

## Project Structure

```
project-folder/
│
├── sample.mp4
├── sample.mp3
├── sample.pdf
├── sample.docx
└── README.md
```

> You can add any number of files. The server will make all files in this folder accessible.

---

# Prerequisites

- Python 3.x installed

Verify Python installation:

```bash
python --version
```

or

```bash
python3 --version
```

---

# Start the Local Server

Navigate to the folder containing your files.

Example:

```bash
cd project-folder
```

Start the HTTP server on port **8000**.

### Windows

```bash
python -m http.server 8000
```

### macOS / Linux

```bash
python3 -m http.server 8000
```

If the server starts successfully, you will see something similar to:

```text
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Keep this terminal window open while accessing the files.

---

# Accessing Files

Open your browser and visit:

```
http://localhost:8000/
```

You will see a directory listing containing all files in the folder.

You can also directly access individual files using their filenames.

## MP4 File

```
http://localhost:8000/sample.mp4
```

Example:

```text
http://localhost:8000/sample.mp4
```

---

## MP3 File

```
http://localhost:8000/sample.mp3
```

Example:

```text
http://localhost:8000/sample.mp3
```

---

## PDF File

```
http://localhost:8000/sample.pdf
```

Example:

```text
http://localhost:8000/sample.pdf
```

---

## Word Document

```
http://localhost:8000/sample.docx
```

Example:

```text
http://localhost:8000/sample.docx
```

---

# Example URLs

Assuming the folder contains:

```
movie.mp4
song.mp3
guide.pdf
document.docx
```

The URLs become:

| File | URL |
|------|-----|
| movie.mp4 | http://localhost:8000/movie.mp4 |
| song.mp3 | http://localhost:8000/song.mp3 |
| guide.pdf | http://localhost:8000/guide.pdf |
| document.docx | http://localhost:8000/document.docx |

---

# Using the URLs

These URLs can be used in:

- Web browsers
- HTML `<video>` tag
- HTML `<audio>` tag
- PDF viewers
- Download links
- REST API testing
- JavaScript applications
- Mobile applications
- Any HTTP client

Example HTML:

### Video

```html
<video controls width="700">
    <source src="http://localhost:8000/sample.mp4" type="video/mp4">
</video>
```

### Audio

```html
<audio controls>
    <source src="http://localhost:8000/sample.mp3" type="audio/mpeg">
</audio>
```

### PDF

```html
<a href="http://localhost:8000/sample.pdf">
    Open PDF
</a>
```

### Word File

```html
<a href="http://localhost:8000/sample.docx">
    Download Word Document
</a>
```

---

# Testing with Browser

Simply paste any file URL into the browser.

Examples:

```
http://localhost:8000/sample.mp4
```

```
http://localhost:8000/sample.mp3
```

```
http://localhost:8000/sample.pdf
```

```
http://localhost:8000/sample.docx
```

---

# Testing with curl

Video

```bash
curl http://localhost:8000/sample.mp4 --output sample.mp4
```

PDF

```bash
curl http://localhost:8000/sample.pdf --output sample.pdf
```

Word

```bash
curl http://localhost:8000/sample.docx --output sample.docx
```

---

# Testing with Postman

1. Open Postman.
2. Create a new **GET** request.
3. Enter the file URL.

Example:

```
http://localhost:8000/sample.pdf
```

4. Click **Send**.
5. The file content will be returned or downloaded depending on the file type.

---

# Sharing with Others

Anyone can reproduce this setup by following these steps:

1. Clone or download this project.
2. Place the required files in the project folder.
3. Open a terminal in the project folder.
4. Start the HTTP server:

```bash
python -m http.server 8000
```

5. Open:

```
http://localhost:8000/
```

6. Access any file directly using its filename:

```
http://localhost:8000/<filename>
```

Example:

```
http://localhost:8000/sample.mp4
```

---

# Stopping the Server

Press:

```text
CTRL + C
```

in the terminal to stop the HTTP server.

---

# Notes

- The server only serves files from the current directory.
- The server is intended for local development and testing.
- By default, the server is accessible only from the machine where it is running using `localhost`.
- If you want other devices on the same network to access the files, start the server and use your machine's local IP address instead of `localhost` (for example, `http://192.168.1.10:8000/sample.mp4`), ensuring your firewall allows incoming connections on port 8000.
- File names are case-sensitive on most Linux and macOS systems.
- Spaces in file names should be URL-encoded (for example, `My File.pdf` becomes `My%20File.pdf`).

---

# Quick Reference

Start server:

```bash
python -m http.server 8000
```

Open directory listing:

```
http://localhost:8000/
```

Access files:

```
http://localhost:8000/sample.mp4
http://localhost:8000/sample.mp3
http://localhost:8000/sample.pdf
http://localhost:8000/sample.docx
```

Stop server:

```text
CTRL + C
```