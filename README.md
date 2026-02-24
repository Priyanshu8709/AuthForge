# Secure Auth System

A full-stack authentication and authorization system built with the MERN stack.
This application demonstrates how real-world web apps securely manage user accounts, login sessions, and protected routes.

---

## Features

* User Signup & Login
* Secure Password Hashing (bcrypt)
* JWT Authentication
* HTTP-Only Cookies
* Protected Backend Routes
* React Frontend Forms
* Logout System
* OTP Email Verification

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
|-- backend
`-- AuthApp
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (AuthApp/.env)

```
VITE_API_BASE=http://localhost:5000/api/v1
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

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | /api/v1/signup          | Register a new user        |
| POST   | /api/v1/verify-signup   | Verify signup OTP          |
| POST   | /api/v1/login           | Login existing user        |
| POST   | /api/v1/verify-login    | Verify login OTP           |
| POST   | /api/v1/logout          | Logout user                |
| GET    | /api/v1/profile         | Get profile (protected)    |

---

## Deployment Notes

* Set `CLIENT_URL` to your frontend origin and `NODE_ENV=production` in the backend environment.
* Set `VITE_API_BASE` to your backend public URL during the frontend build.
* Configure SPA rewrites on your static host (Vercel `vercel.json` or Netlify `_redirects`).
* Ensure MongoDB Atlas allows your deployment IP (or use a temporary allow-all during testing).

---

## Author

Priyanshu Raj