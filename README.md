# Secure Auth API

A production-style authentication and authorization backend built using Node.js, Express, MongoDB and JWT.
This project demonstrates how real applications securely manage user identity, sessions and protected resources.

---

## Features

* User Registration
* Secure Password Hashing (bcrypt)
* Login Authentication
* JWT Token Generation
* HTTP-Only Cookie Storage
* Protected Routes Middleware
* Role Based Access Control (User / Admin)
* Logout Functionality
* Password Reset (planned)
* OTP Email Verification (planned)

---

## Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Security**

* bcryptjs
* jsonwebtoken
* cookie-parser
* dotenv

**Utilities**

* Nodemailer (for email verification)
* CORS

---

## Project Structure

```
auth-system
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── .env
└── server.js
```

---

## Getting Started

### 1. Clone Repository

```
git clone https://github.com/YOURUSERNAME/secure-auth-api.git
cd secure-auth-api
```

### 2. Install Dependencies

```
npm install
```

### 3. Environment Variables

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

### 4. Run Server

```
npm start
```

Server will start at:

```
http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

---

## Purpose of This Project

The goal of this project is to demonstrate backend development skills including authentication, security practices, database design and middleware implementation.
It is designed as a portfolio-ready project for internship and developer roles.

---

## Future Improvements

* Refresh Tokens
* Email Verification
* OTP Authentication
* Rate Limiting
* Account Lock after failed attempts

---

## Author

Priyanshu Raj
