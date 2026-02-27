import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OtpCard from '../components/OtpCard.jsx'
import LoadingOverlay from '../components/LoadingOverlay.jsx'
import { apiGet, apiPost } from '../utils/api.js'
import { setStoredUser } from '../utils/authStorage.js'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const [loaderMessage, setLoaderMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please fix the highlighted fields.')
      return
    }
    try {
      setLoaderMessage('Sending OTP...')
      await apiPost('/login', {
        email: form.email.trim(),
        password: form.password,
      })
      setOtpEmail(form.email.trim())
      setOtpOpen(true)
      toast.success('OTP sent to your email.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoaderMessage('')
    }
  }

  const handleMenuNav = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  const handleVerifyOtp = async (otp) => {
    try {
      setLoaderMessage('Verifying OTP...')
      await apiPost('/verify-login', { email: otpEmail, otp })
      const data = await apiGet('/profile')
      setStoredUser(data.user)
      toast.success('Login verified successfully.')
      setOtpOpen(false)
      navigate('/profile')
      return true
    } catch (error) {
      toast.error(error.message)
      return false
    } finally {
      setLoaderMessage('')
    }
  }

  return (
    <div className="page auth">
      <div className="ambient glow-one" aria-hidden="true" />
      <div className="ambient glow-two" aria-hidden="true" />
      <header className="nav container">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>AuthForge</span>
        </div>
        <div className="nav-actions">
          <Link className="btn ghost" to="/">
            Back home
          </Link>
          <Link className="btn primary compact" to="/signup">
            Create account
          </Link>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="login-mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div
          id="login-mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          role="menu"
        >
          <button type="button" onClick={() => handleMenuNav('/')}>
            Back home
          </button>
          <button type="button" onClick={() => handleMenuNav('/signup')}>
            Create account
          </button>
        </div>
      </header>

      <main className="container auth-layout">
        <section className="auth-panel side">
          <span className="tag">Welcome back</span>
          <h1>Log in to your workspace</h1>
          <p className="muted">
            Access secure routes, manage sessions, and continue building your
            product with confidence.
          </p>
          <div className="stacked">
            <div className="note-card">
              <h3>Secure sessions</h3>
              <p className="muted">
                Token refresh and device checks keep your account protected.
              </p>
            </div>
            <div className="note-card">
              <h3>Fast recovery</h3>
              <p className="muted">
                Password reset tools are baked into the flow.
              </p>
            </div>
          </div>
        </section>

        <section className="auth-card accent">
          <div className="auth-card-head">
            <h2>Sign in</h2>
            <p className="muted">Use your email and password to continue.</p>
          </div>
          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'invalid' : ''}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
            {errors.email ? (
              <span id="login-email-error" className="error-text">
                {errors.email}
              </span>
            ) : null}
            <label htmlFor="login-password">Password</label>
            <div className="input-group">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'invalid' : ''}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />
              <button
                className="toggle-visibility"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M2.5 12s3.7-6 9.5-6 9.5 6 9.5 6-3.7 6-9.5 6-9.5-6-9.5-6z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="M6.5 7.2l-1.2-2M12 6V3.6M17.5 7.2l1.2-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 10.5c2.6 2.2 5.3 3.3 8 3.3s5.4-1.1 8-3.3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12.6v3M12 13v3.2M16 12.6v3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password ? (
              <span id="login-password-error" className="error-text">
                {errors.password}
              </span>
            ) : null}
            <div className="form-row">
              <Link className="link" to="/forgot">
                Forgot password?
              </Link>
            </div>
            <button className="btn primary full" type="submit">
              Log in
            </button>
          </form>
          <p className="foot-note">
            New here? <Link to="/signup">Create a new account</Link>
          </p>
        </section>
      </main>
      {otpOpen ? (
        <OtpCard
          email={otpEmail}
          title="Verify your login"
          subtitle="Enter the one-time password to finish signing in."
          onVerify={handleVerifyOtp}
          onClose={() => setOtpOpen(false)}
        />
      ) : null}
      <LoadingOverlay show={Boolean(loaderMessage)} message={loaderMessage} />
    </div>
  )
}

export default Login
