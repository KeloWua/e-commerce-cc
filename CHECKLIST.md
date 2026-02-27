# ✅ E-Commerce Full Stack Project Checklist

Stack:
- Backend: Node.js + Express + PostgreSQL
- Frontend: React (template)
- Auth: JWT + Google OAuth
- Payments: Stripe
- Deploy: Render

---

## 🟢 PHASE 0 – Project Setup

- [v] Initialize Git repository
- [v] Create project structure (backend / frontend)
- [v] Create CHECKLIST.md
- [v] Create TASK.md
- [v] Install backend dependencies
- [v] Setup .env file
- [v] First commit: "Initial project structure"

---

## 🟢 PHASE 1 – Backend Base Setup

### Server & Config
- [v] Setup Express server (app.js, server.js)
- [v] Setup CORS
- [v] Setup dotenv
- [v] Setup Morgan logger
- [v] Test server runs (GET / returns OK)

### Database
- [v] Install PostgreSQL locally
- [v] Create database
- [v] Setup pg connection (db.js)
- [v] Test DB connection

---

## 🟢 PHASE 2 – User Authentication (JWT)

### User Model
- [v] Create user table (id, email, password, created_at)

### Register
- [v] POST /auth/register
- [v] Hash password with bcrypt
- [v] Save user to DB

### Login
- [v] POST /auth/login
- [v] Compare password
- [v] Generate JWT token

### Middleware
- [v] Create auth middleware
- [v] Protect private routes

---

## 🟢 PHASE 3 – OAuth (Google Login)

- [ ] Setup Passport
- [ ] Setup Google OAuth credentials
- [ ] Create /auth/google route
- [ ] Handle Google callback
- [ ] Create or find user in DB
- [ ] Generate JWT after Google login

---

## 🟢 PHASE 4 – Products

### Product Model
- [ ] Create products table
- [ ] Fields: id, name, description, price, image_url, stock

### API
- [ ] GET /products
- [ ] GET /products/:id
- [ ] POST /products (admin only)

---

## 🟢 PHASE 5 – Cart & Orders

### Orders Table
- [ ] Create orders table
- [ ] user_id
- [ ] total_price
- [ ] status
- [ ] created_at

### Order Items Table
- [ ] order_id
- [ ] product_id
- [ ] quantity

### API
- [ ] POST /orders
- [ ] GET /orders (user only)
- [ ] GET /orders/:id

---

## 🟢 PHASE 6 – Stripe Payments

- [ ] Create Stripe account
- [ ] Setup Stripe secret key in .env
- [ ] Create checkout session endpoint
- [ ] Redirect frontend to Stripe checkout
- [ ] Handle success and cancel URLs
- [ ] Save order after successful payment

---

## 🟢 PHASE 7 – Frontend Setup (React Template)

### Pages
- [ ] Home
- [ ] Login
- [ ] Register
- [ ] Products
- [ ] Cart
- [ ] Checkout
- [ ] Orders

### Context
- [ ] AuthContext
- [ ] CartContext

### Services
- [ ] API service (axios/fetch)
- [ ] Auth service
- [ ] Product service
- [ ] Order service

---

## 🟢 PHASE 8 – Frontend Features

- [ ] User registration form
- [ ] User login form
- [ ] Google login button
- [ ] Product list
- [ ] Add to cart
- [ ] Remove from cart
- [ ] Checkout button
- [ ] Order history page
- [ ] Protected routes

---

## 🟢 PHASE 9 – Integration Frontend + Backend

- [ ] Connect frontend to backend API
- [ ] Handle JWT in frontend (localStorage)
- [ ] Protect private pages
- [ ] Test full purchase flow

---

## 🟢 PHASE 10 – Deployment (Render)

### Backend
- [ ] Push backend to GitHub
- [ ] Create Render Web Service
- [ ] Add env variables in Render
- [ ] Connect PostgreSQL on Render
- [ ] Test deployed API

### Frontend
- [ ] Build React app
- [ ] Deploy frontend on Render
- [ ] Update API URL

---

## 🟢 PHASE 11 – Final Features

- [ ] Error handling
- [ ] Loading states
- [ ] Input validation
- [ ] Security (helmet, rate limit optional)
- [ ] README.md documentation

---

## 🟢 PHASE 12 – Testing & Cleanup

- [ ] Test all endpoints
- [ ] Test payments
- [ ] Remove console.logs
- [ ] Final commit
- [ ] Project ready for submission

---

## 🎯 RULES

- Do not skip phases
- Commit after each phase