import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import './App.css'

const NotFound = () => (
  <div className="page auth">
    <div className="container auth-layout single">
      <div className="auth-panel">
        <span className="tag">404</span>
        <h1>Page not found</h1>
        <p className="muted">
          The page you are looking for does not exist. Head back to the
          homepage to continue.
        </p>
        <Link className="btn primary" to="/">
          Back to home
        </Link>
      </div>
    </div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" autoClose={2500} />
    </BrowserRouter>
  )
}

export default App
