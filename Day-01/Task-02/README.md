# Client-Server Architecture: Communication Between Two Clients on Different Networks

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-Client--Server-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Communication-TCP%20Sockets-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Networking-Distributed%20Systems-orange?style=for-the-badge">
</p>

---

# Overview

This document explains how **two clients connected to different networks** communicate with each other using a **single central server**.

In a client-server architecture, clients **never communicate directly**. Instead, all communication passes through the server, which acts as an intermediary responsible for routing messages, maintaining active connections, and identifying clients.

---

# Architecture

```text
                    INTERNET

        ┌──────────────────────────────────────────────┐
        │                                              │
        │              Central Server                  │
        │                                              │
        │  Stores Connected Clients                    │
        │  Routes Messages                             │
        │  Authenticates Users                         │
        │  Manages Active Connections                  │
        │                                              │
        └──────────────────────────────────────────────┘
                  ▲                         ▲
                  │                         │
                  │                         │
         TCP Connection             TCP Connection
                  │                         │
                  │                         │
        ┌─────────┘                         └──────────┐
        │                                             │

┌──────────────────┐                      ┌──────────────────┐
│    Client A      │                      │    Client B      │
│                  │                      │                  │
│ Network A        │                      │ Network B        │
│ India            │                      │ USA              │
└──────────────────┘                      └──────────────────┘
```

---

# High-Level Communication Flow

```text
        Client A
            │
            │ Send Message
            ▼
      ┌──────────────┐
      │    Server    │
      └──────────────┘
            │
            │ Forward Message
            ▼
        Client B
```

Every message always follows this path:

```
Client → Server → Client
```

---

# Step 1: Client Connection

When a client starts, it connects to the server.

Example:

```
Client A → Server
Client B → Server
```

The server creates **independent TCP socket connections**.

```
             Server

      Socket 101 ←──── Client A

      Socket 102 ←──── Client B
```

Each connected client receives its own socket.

---

# Step 2: Authentication

Usually, clients authenticate after connecting.

Example:

```
Client A

Username : Alice
Password : ********
```

Server stores

```
Alice → Socket 101
```

Similarly,

```
Bob → Socket 102
```

---

# Step 3: Server Maintains Connected Clients

Internally, the server maintains something similar to this.

| User | Socket ID | Status |
|-------|-----------|--------|
| Alice | 101 | Online |
| Bob | 102 | Online |
| Charlie | 103 | Online |

Or in code

```python
connected_clients = {
    "Alice": socket101,
    "Bob": socket102,
    "Charlie": socket103
}
```

---

# Step 4: Sending a Message

Suppose Alice wants to send

```
Hello Bob!
```

The client sends

```json
{
  "from": "Alice",
  "to": "Bob",
  "message": "Hello Bob!"
}
```

---

# Step 5: Server Receives the Message

The server receives the packet from

```
Socket 101
```

Since Socket 101 belongs to Alice,

the server immediately knows

```
Sender = Alice
```

---

# Step 6: Finding the Receiver

The server checks

```
Recipient = Bob
```

It searches its connection table

```
Alice → Socket 101

Bob → Socket 102

Charlie → Socket 103
```

The server finds

```
Bob = Socket 102
```

---

# Step 7: Forwarding the Message

The server forwards the message through Bob's socket.

```
                 Server

Socket101 --------------------→ Socket102
   Alice                         Bob
```

Bob receives

```
Hello Bob!
```

---

# Complete Message Flow

```text
        Alice

          │

          │

          ▼

+----------------------+
|                      |
|      Server          |
|                      |
| Socket 101 → Alice   |
| Socket 102 → Bob     |
|                      |
+----------------------+

          │

          │

          ▼

         Bob
```

---

# Sequence Diagram

```text
Alice                    Server                     Bob

 |                         |                         |
 |----- Connect ---------->|                         |
 |                         |                         |
 |<---- Connection OK -----|                         |
 |                         |                         |
 |                         |<------ Connect ---------|
 |                         |                         |
 |                         |------ Connection OK --->|
 |                         |                         |
 |----- Login ------------>|                         |
 |                         |                         |
 |                         |<-------- Login ---------|
 |                         |                         |
 |---- Send Message ------>|                         |
 |                         |                         |
 |                         |---- Forward ----------->|
 |                         |                         |
 |                         |<------ Delivered -------|
 |<---- Delivery Status ---|                         |
```

---

# Internal Working of the Server

The server continuously performs the following tasks.

```
Incoming Connection

        │

        ▼

Authenticate User

        │

        ▼

Store Socket

        │

        ▼

Wait for Messages

        │

        ▼

Read Receiver

        │

        ▼

Find Receiver Socket

        │

        ▼

Forward Message

        │

        ▼

Repeat
```

---

# Why Clients Can Be on Different Networks

Suppose

```
Client A

Private IP

192.168.1.20
```

and

```
Client B

Private IP

10.0.0.15
```

These private IPs are **not directly reachable** over the Internet.

Instead, both clients establish outbound connections to the server's **public IP**.

```
Client A
192.168.1.20
        │
        │
        ▼

Public Server

203.0.113.10

        ▲
        │
        │

Client B
10.0.0.15
```

Thus,

- Client A never needs Client B's private IP.
- Client B never needs Client A's private IP.

Only the server's address is required.

---

# Server Data Structure

Most chat servers maintain a mapping similar to this.

```python
clients = {

    "Alice": socket101,

    "Bob": socket102,

    "Charlie": socket103,

    "David": socket104

}
```

Whenever a message arrives

```python
receiver = message["to"]

clients[receiver].send(message)
```

---

# Example Packet Flow

```
Alice

↓

{
    from : Alice
    to   : Bob
    text : Hello
}

↓

Server

↓

Find Bob

↓

Socket 102

↓

Bob receives

Hello
```

---

# Real-World Example

This architecture is used by

- WhatsApp
- Discord
- Slack
- Microsoft Teams
- Telegram
- Facebook Messenger
- Signal

All these applications route messages through centralized or distributed servers.

---

# Advantages

✅ Clients do not need to know each other's IP addresses.

✅ Communication works across different networks.

✅ Easier authentication and authorization.

✅ Centralized logging.

✅ Better security.

✅ NAT traversal becomes simple.

✅ Supports millions of concurrent clients.

---

# Disadvantages

- Server becomes a single point of failure.
- Increased server load.
- Higher infrastructure cost.
- Additional latency compared to peer-to-peer communication.

---

# Summary

```
                 Client A
                     │
                     │
                     ▼
              ┌──────────────┐
              │              │
              │    Server    │
              │              │
              └──────────────┘
                     ▲
                     │
                     │
                 Client B
```

The server identifies each client using its **socket connection** and authenticated identity. It maintains a mapping between users and their active sockets, allowing it to route messages to the correct recipient regardless of where the clients are located.

---

# Key Takeaways

- Each client establishes a unique TCP socket with the server.
- The server maintains a mapping between users and sockets.
- Every incoming message is associated with the sender's socket.
- The server reads the recipient's identifier from the message.
- The server forwards the message through the recipient's socket.
- Clients never communicate directly.
- The communication path is always:

```
Client → Server → Client
```

---

