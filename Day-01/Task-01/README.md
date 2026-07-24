# 🛒 Online Shopping System - UML Class Diagram

<p align="center">
  <img src="https://img.shields.io/badge/UML-Class%20Diagram-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Language-Java-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Design-OOP-green?style=for-the-badge">
</p>

---

# 📖 Overview

This project represents the **UML Class Diagram** for an **Online Shopping System**. The diagram models the core entities involved in an e-commerce application, including customer management, shopping cart, products, payments, and order processing.

The design follows **Object-Oriented Programming (OOP)** principles by separating responsibilities into individual classes that interact to complete the shopping workflow.

---

# 🏗️ System Architecture

```text
                   Customer
                       │
                       │
                       ▼
                    Cart
                       │
                       │
                       ▼
                   Product
                       │
                       │
                       ▼
                   Payment
                       │
                       │
                       ▼
                     Order
```

The customer interacts with the shopping cart to manage products, proceeds with payment, and finally places an order.

---

# 📦 Classes Overview

The system consists of **five major classes**:

| Class | Description |
|--------|-------------|
| Customer | Represents the registered user of the shopping system. |
| Cart | Stores selected products before checkout. |
| Product | Represents products available for purchase. |
| Payment | Handles payment processing and verification. |
| Order | Represents a successfully placed order. |

---

# 📚 Class Details

---

## 👤 Customer

The **Customer** class represents the user interacting with the shopping system.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| customerID | int | Unique customer identifier |
| name | String | Customer name |
| email | String | Customer email |
| password | String | Customer password |

### Methods

```text
login()
addToCart()
searchProduct()
makePayment()
placeOrder()
```

### Responsibilities

- Authenticate users
- Search products
- Add items to cart
- Initiate payment
- Place orders

---

## 🛍️ Cart

The **Cart** stores products selected by the customer before checkout.

### Attributes

| Attribute | Type |
|-----------|------|
| cartID | int |
| items | Product[] |
| totalAmount | double |

### Methods

```text
addItem()
removeItem()
checkout()
calculateTotal()
```

### Responsibilities

- Store selected products
- Remove unwanted items
- Calculate total price
- Proceed to checkout

---

## 📦 Product

The **Product** class represents an item available for purchase.

### Attributes

| Attribute | Type |
|-----------|------|
| productID | int |
| name | String |
| price | double |
| stock | int |

### Methods

```text
search()
viewDetails()
updateStock()
```

### Responsibilities

- Display product information
- Maintain stock availability
- Support product search

---

## 💳 Payment

The **Payment** class manages payment processing.

### Attributes

| Attribute | Type |
|-----------|------|
| paymentID | int |
| amount | double |
| paymentMethod | String |
| status | String |

### Methods

```text
processPayment()
verifyPayment()
```

### Responsibilities

- Process payments
- Verify transaction status
- Store payment information

---

## 📑 Order

The **Order** class represents a completed purchase.

### Attributes

| Attribute | Type |
|-----------|------|
| orderID | int |
| orderDate | Date |
| status | String |
| totalAmount | double |

### Methods

```text
createOrder()
confirmOrder()
cancelOrder()
trackOrder()
```

### Responsibilities

- Create new orders
- Confirm successful orders
- Cancel existing orders
- Track order status

---

# 🔄 Workflow

The shopping process follows these steps:

```text
Customer

    │

    ▼

Search Products

    │

    ▼

Add Products to Cart

    │

    ▼

Checkout

    │

    ▼

Payment Processing

    │

    ▼

Order Creation

    │

    ▼

Order Confirmation
```

---

# 🔗 Class Relationships

```text
+------------+
| Customer   |
+------------+
      |
      | Uses
      ▼
+------------+
|   Cart     |
+------------+
      |
      | Contains
      ▼
+------------+
| Product    |
+------------+
      |
      | Purchased Through
      ▼
+------------+
| Payment    |
+------------+
      |
      | Generates
      ▼
+------------+
| Order      |
+------------+
```

---

# 📊 UML Relationship Explanation

### Customer → Cart

A customer owns a shopping cart.

```
Customer
      │
      ▼
     Cart
```

---

### Cart → Product

A cart contains one or more products.

```
Cart

├── Product 1

├── Product 2

└── Product n
```

---

### Product → Payment

Products selected in the cart determine the payment amount.

```
Products

↓

Payment
```

---

### Payment → Order

A successful payment creates an order.

```
Payment

↓

Order
```

---

# 🛒 Complete Shopping Process

```text
Customer Login
        │
        ▼
Search Products
        │
        ▼
View Product Details
        │
        ▼
Add to Cart
        │
        ▼
Calculate Total
        │
        ▼
Checkout
        │
        ▼
Process Payment
        │
        ▼
Verify Payment
        │
        ▼
Create Order
        │
        ▼
Track Order
```

---

# 🎯 Object-Oriented Concepts Used

## Encapsulation

Each class encapsulates its own attributes and methods.

Example:

```java
class Product {

    private int productID;
    private String name;
    private double price;

}
```

---

## Abstraction

Each class exposes only relevant operations.

Example:

```
processPayment()

verifyPayment()

checkout()
```

---

## Modularity

Each component performs one primary responsibility.

| Module | Responsibility |
|----------|---------------|
| Customer | User management |
| Cart | Shopping management |
| Product | Product catalog |
| Payment | Transaction processing |
| Order | Order management |

---

# ✅ Advantages

- Easy to understand
- Modular architecture
- High maintainability
- Supports scalability
- Clear separation of responsibilities
- Reusable classes
- Follows Object-Oriented Design principles

---

# 🚀 Possible Future Enhancements

The current UML model can be extended with additional classes such as:

- Admin
- Inventory
- Shipping
- Delivery
- Reviews
- Wishlist
- Discount/Coupons
- Notification
- Address
- Invoice

---

# 📌 Summary

This UML Class Diagram models the core workflow of an online shopping application. It demonstrates how different classes collaborate to provide a complete shopping experience—from customer authentication and product selection to payment processing and order management.

The design follows **Object-Oriented Programming (OOP)** principles, making it modular, maintainable, scalable, and suitable as a foundation for implementing an e-commerce system in languages such as **Java**, **C++**, **Python**, or **C#**.
