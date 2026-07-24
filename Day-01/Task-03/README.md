# Website Rendering Flow Explained

## Example Website: BMW TechWorks India

Website:

```
https://www.bmwtechworks.in
```

This document explains the complete journey of a website request:

- How a browser finds a website
- How DNS works
- How HTML, CSS, JavaScript, and images are delivered
- How the browser renders the page
- Difference between SSR, CSR, and SSG
- Rendering architecture used by a modern company website

---

# 1. Complete Website Loading Flow

When a user enters:

```
www.bmwtechworks.in
```

the following process happens:

```
User
 |
 | Enter URL
 |
 v
Browser
 |
 | DNS Lookup
 |
 v
DNS Server
 |
 | Returns IP Address
 |
 v
Web Server / CDN
 |
 | Sends Website Files
 |
 v
Browser Rendering Engine
 |
 | Parse HTML
 | Load CSS
 | Execute JavaScript
 | Download Images
 |
 v
Final Web Page
```

---

# 2. URL Structure

Example:

```
https://www.bmwtechworks.in/about
```

Breakdown:

```
https://
   |
   |-- Protocol

www.bmwtechworks.in
   |
   |-- Domain Name

/about
   |
   |-- Resource Path
```

---

# 3. DNS Resolution

## What is DNS?

DNS (Domain Name System) converts a human-readable domain name into an IP address.

Humans use:

```
www.bmwtechworks.in
```

Computers use:

```
192.xxx.xxx.xxx
```

DNS works like a phone book for the internet.

---

## DNS Lookup Flow

```
Browser Cache

      |

      v

Operating System Cache

      |

      v

Router Cache

      |

      v

ISP DNS Resolver

      |

      v

Root DNS Server

      |

      v

Top Level Domain Server (.in)

      |

      v

Authoritative DNS Server

      |

      v

Website IP Address
```

Example:

```
bmwtechworks.in

        |

        v

Server IP Address
```

---

# 4. Establishing Connection

After getting the IP address, the browser connects to the server.

For HTTPS websites:

```
Browser
   |
   |
   | TCP Connection
   |
   | TLS Handshake
   |
   v
Web Server
```

---

## TLS Handshake

The browser verifies:

- Website certificate
- Domain ownership
- Encryption keys
- Secure communication

Example:

```
Certificate:

Domain:
bmwtechworks.in

Status:
Valid HTTPS Certificate
```

---

# 5. HTTP Request

The browser sends a request:

```
GET / HTTP/1.1

Host:
www.bmwtechworks.in
```

Meaning:

```
Browser:
"Give me the homepage of this website"
```

---

# 6. Server Processing

The web server receives the request.

Typical server structure:

```
Server

/var/www/html

 |
 |-- index.html
 |
 |-- style.css
 |
 |-- script.js
 |
 |-- images/
 |
 |-- fonts/
```

The server finds the required files.

---

# 7. Server Response

The server sends:

```
HTML
CSS
JavaScript
Images
Fonts
```

Example:

```
HTTP/1.1 200 OK

Content-Type:
text/html
```

---

# 8. Website Rendering Types

There are three major rendering approaches.

---

# 8.1 Server-Side Rendering (SSR)

In SSR:

The server creates the HTML before sending it.

Flow:

```
Browser

   |

   | Request Page

   v

Server

   |

   | Generate HTML

   v

Complete HTML Response

   |

   v

Browser Displays Page
```

Example:

Server sends:

```html
<html>

<body>

<h1>
BMW TechWorks India
</h1>

</body>

</html>
```

The browser already has the content.

---

# 8.2 Client-Side Rendering (CSR)

In CSR:

The browser creates the page using JavaScript.

Flow:

```
Browser

    |

    v

Server Sends Empty HTML

    |

    v

JavaScript Downloads

    |

    v

JavaScript Builds UI

    |

    v

User Sees Page
```

Example:

```html
<div id="root"></div>

<script src="app.js"></script>
```

Common frameworks:

- React
- Angular
- Vue

---

# 8.3 Static Site Generation (SSG)

In SSG:

HTML is generated during build time.

Flow:

```
Developer

    |

    v

Build Process

    |

    v

Pre-created HTML Files

    |

    v

CDN/Web Server

    |

    v

User Browser
```

Advantages:

- Very fast
- SEO friendly
- Low server processing

---

# 9. BMW TechWorks Rendering Model

The website architecture can be classified as:

```
Server Generated HTML

+

Client Side JavaScript

+

Browser Rendering
```

Meaning:

```
HTML Generation:
Server Side / Static Generation


CSS:
Client Side


JavaScript:
Client Side Execution


Final Pixels:
Browser Rendering Engine
```

---

# 10. Browser Rendering Pipeline

After receiving HTML:

```
HTML

 |

 v

DOM Tree
```

Example:

HTML:

```html
<body>

<h1>Hello</h1>

<p>Welcome</p>

</body>
```

DOM:

```
Document

 |

Body

 |

 +-- h1

 |

 +-- p
```

---

# 11. CSS Processing

Browser loads:

```
style.css
```

Example:

```css
h1 {

color: blue;

font-size: 40px;

}
```

Browser creates:

```
CSSOM Tree
```

Then:

```
DOM

 +

CSSOM

 |

 v

Render Tree
```

---

# 12. JavaScript Execution

Browser loads:

```
script.js
```

JavaScript provides:

- Animations
- Buttons
- Forms
- Menus
- Dynamic updates

Example:

```javascript
button.onclick = function(){

alert("Clicked");

}
```

---

# 13. Image Loading

HTML:

```html
<img src="logo.png">
```

Browser requests:

```
GET /logo.png
```

Server returns:

```
Image Binary Data
```

Browser displays:

```
Logo Image
```

---

# 14. Final Rendering Process

Browser rendering engine:

```
HTML

 |

 v

DOM

 |

CSS

 |

 v

CSSOM

 |

 v

Render Tree

 |

 v

Layout Calculation

 |

 v

Painting

 |

 v

GPU Composition

 |

 v

Screen Pixels
```

---

# 15. Browser Internal Components

Example: Google Chrome

```
Chrome Browser

 |

 +-- Network Layer

 |

 +-- Blink Rendering Engine

 |

 +-- V8 JavaScript Engine

 |

 +-- GPU Renderer

 |

 +-- Cache Storage
```

---

# 16. How To Check Rendering Type Yourself

## Method 1: View Page Source

Open:

```
Right Click

View Page Source
```

SSR example:

```html
<h1>
BMW TechWorks India
</h1>
```

CSR example:

```html
<div id="root"></div>
```

---

## Method 2: Disable JavaScript

Chrome:

```
F12

Settings

Disable JavaScript

Reload Page
```

Result:

```
Page works

=

SSR / SSG
```

or

```
Blank page

=

CSR
```

---

## Method 3: Network Inspection

Open:

```
F12

Network Tab

Document Request
```

SSR:

```
HTML content exists
```

CSR:

```
Empty HTML shell
```

---

# 17. Complete Architecture Diagram

```
                 USER

                  |

                  v

              Browser

                  |

                  v

             DNS Lookup

                  |

                  v

            IP Address

                  |

                  v

          Web Server / CDN

                  |

                  v

        HTML + CSS + JS + Images

                  |

                  v

          Browser Engine

                  |

        +---------+---------+

        |         |         |

       HTML      CSS       JS

        |         |         |

        v         v         v

       DOM      CSSOM    Events


                  |

                  v

             Render Tree

                  |

                  v

              Paint

                  |

                  v

              Screen
```

---

# 18. Summary Table

| Component | Responsibility |
|---|---|
| DNS | Converts domain name to IP |
| Browser | Sends requests and displays content |
| Server | Stores and delivers files |
| HTML | Website structure |
| CSS | Website styling |
| JavaScript | Website behavior |
| DOM | HTML representation |
| CSSOM | CSS representation |
| Rendering Engine | Converts code into pixels |
| GPU | Final screen rendering |

---

# Final Conclusion

For:

```
https://www.bmwtechworks.in
```

The rendering architecture is:

```
Server Side HTML Generation
        +
Client Side JavaScript Execution
        +
Browser Rendering
```

It is not a pure Client-Side Rendering application.

The browser receives meaningful HTML from the server, then enhances the page using CSS and JavaScript before displaying the final result.

This approach provides:

- Faster first page loading
- Better SEO
- Better user experience
- Good performance
- Interactive features
