# Secure Auth System

A full-stack authentication and authorization system built with the MERN stack.
This application demonstrates how real-world web apps securely manage user accounts, login sessions and protected routes.

---

## Features

* User Signup & Login
* Secure Password Hashing (bcrypt)
* JWT Authentication
* HTTP-Only Cookies
* Protected Backend Routes
* React Frontend Forms
* Logout System
* OTP Email Verification & Password Reset

---

## Tech Stack

### Frontend

* React (Vite)
* JavaScript
* Fetch API
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Security

* bcryptjs
* jsonwebtoken
* cookie-parser

---

## Folder Structure

```
secure-auth-system
│
├── backend
└── AuthApp
```

---

## Running the Project

### Backend

```
cd backend
npm install
npm run start
```

### Frontend

```
cd AuthApp
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/v1/sigup      | Register a new user |
| POST   | /api/v1/login      | Login existing user |

---

## Purpose

This project is built as a portfolio-ready full-stack application demonstrating secure authentication, backend architecture and frontend-backend communication.

---

## Author

Priyanshu Raj
