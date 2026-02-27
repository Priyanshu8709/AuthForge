# Secure Auth System

A full-stack authentication and authorization system built with the MERN stack.
This application demonstrates how real-world web apps securely manage user accounts, login sessions, and protected routes.

---

## Features

* User Signup & Login
* Secure Password Hashing (bcrypt)
* JWT Authentication
* Bearer token stored in localStorage (no cookies required)
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
# Brevo (Sendinblue) transactional email service
BREVO_API_KEY=your_brevo_api_key
# optional - sender address used in emails
EMAIL_FROM=your_verified_sender@example.com
# set CLIENT_URL to the address you load the frontend from (can be IP for mobile)
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
> **Note:** authentication tokens are returned in the response body after
> OTP verification. Clients store the token in `localStorage` and send it
> in the `Authorization: Bearer <token>` header for subsequent requests.
> Cookies are no longer used by the API.
> **Tip:** if you're testing from a phone on the same network, use the
> machine's LAN IP (e.g. `http://192.168.1.5:5173`) and add that value to
> `CLIENT_URL` so CORS allows it. In development the cookie is sent with
> `SameSite=lax` (since the port difference still counts as same‑site),
> which avoids requirements for `Secure` headers.  In production the cookie
> will be issued with `SameSite=None; Secure` to support cross‑origin
> access.

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
| GET    | /api/v1/profile or /api/v1/me | Get profile (protected)    |

---

## Deployment Notes

* Set `CLIENT_URL` to your frontend origin and `NODE_ENV=production` in the backend environment.
* Set `VITE_API_BASE` to your backend public URL during the frontend build.
* Configure SPA rewrites on your static host (Vercel `vercel.json` or Netlify `_redirects`).
* Ensure MongoDB Atlas allows your deployment IP (or use a temporary allow-all during testing).

---

## Author

Priyanshu Raj