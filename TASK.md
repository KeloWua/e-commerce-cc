# E-Commerce Full Stack Project – Task Definition

## Project Description
Build a full-stack e-commerce application using:
- Frontend: React
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT + OAuth (Google or similar)
- Payments: Stripe
- Deployment: Render

This file defines ONLY the project structure.  
All files must be created EMPTY (no code inside).

---

## Root Structure

ecommerce-app/
│
├── backend/
├── frontend/
├── README.md
├── TASK.md
└── .gitignore

---

## Backend Structure (Node.js + Express)

backend/
│
├── package.json
├── .env
└── src/
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   ├── db.js
    │   └── passport.js
    │
    ├── routes/
    │   ├── auth.routes.js
    │   ├── users.routes.js
    │   ├── products.routes.js
    │   ├── orders.routes.js
    │   └── payments.routes.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── users.controller.js
    │   ├── products.controller.js
    │   ├── orders.controller.js
    │   └── payments.controller.js
    │
    ├── models/
    │   ├── user.model.js
    │   ├── product.model.js
    │   └── order.model.js
    │
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    │
    └── utils/
        └── stripe.js

---

## Frontend Structure (React)

frontend/
│
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Products.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   └── Orders.jsx
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── CartItem.jsx
    │   └── ProtectedRoute.jsx
    │
    ├── services/
    │   ├── api.js
    │   ├── auth.service.js
    │   ├── product.service.js
    │   └── order.service.js
    │
    ├── context/
    │   ├── AuthContext.jsx
    │   └── CartContext.jsx
    │
    └── styles/
        └── main.css

---

## Rules for AI Agent

- Do NOT generate business logic code unless explicitly asked.
- Only create empty files and folders according to this structure.
- The goal is learning, not auto-completing the project.
- The developer (student) will implement logic step by step.

---

## Development Phases

1. Setup backend structure
2. Setup frontend structure
3. Authentication system
4. Product browsing
5. Shopping cart
6. Stripe payment integration
7. Order history
8. Deployment on Render