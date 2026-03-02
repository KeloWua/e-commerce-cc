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

- [v] Setup Passport
- [v] Setup Google OAuth credentials
- [v] Create /auth/google route
- [v] Handle Google callback
- [v] Create or find user in DB
- [v] Generate JWT after Google login

---

## 🟢 PHASE 4 – Products

### Product Model
- [v] Create products table
- [v] Fields: id, name, description, price, image_url, stock

### API
- [v] GET /products
- [v] GET /products/:id
- [v] POST /products (admin only)

---

## 🟢 PHASE 5 – Cart & Orders

### Orders Table
- [v] Create orders table
- [v] user_id
- [v] total_price
- [v] status
- [v] created_at

### Order Items Table
- [v] order_id
- [v] product_id
- [v] quantity

### API
- [v] POST /orders
- [v] GET /orders (user only)
- [v] GET /orders/:id

---

## 🟢 PHASE 6 – Stripe Payments

- [v] Create Stripe account
- [v] Setup Stripe secret key in .env
- [v] Create checkout session endpoint
- [v] Redirect frontend to Stripe checkout
- [v] Handle success and cancel URLs
- [v] Save order after successful payment

---

## 🟢 PHASE 7 – Frontend Setup (React Template)

### Pages
- [v] Home
- [v] Login
- [v] Register
- [v] Products
- [v] Cart
- [v] Checkout
- [v] Orders

### Context
- [v] AuthContext
- [v] OrderContext

### Services
- [v] API service (axios/fetch)
- [v] Auth service
- [v] Product service
- [v] Order service

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