import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OtpCard from '../components/OtpCard.jsx'
import LoadingOverlay from '../components/LoadingOverlay.jsx'
import { apiPost } from '../utils/api.js'

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const [loaderMessage, setLoaderMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required.'
    }
    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.'
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!form.password) {
      nextErrors.password = 'Password is required.'
    } else if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
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
      const name = `${form.firstName} ${form.lastName}`.trim()
      await apiPost('/signup', {
        name,
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
      await apiPost('/verify-signup', { email: otpEmail, otp })
      toast.success('Account verified. Please log in.')
      setOtpOpen(false)
      navigate('/login')
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
      <div className="ambient glow-three" aria-hidden="true" />
      <header className="nav container">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>AuthForge</span>
        </div>
        <div className="nav-actions">
          <Link className="btn ghost" to="/">
            Back home
          </Link>
          <Link className="btn outline" to="/login">
            Log in
          </Link>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="signup-mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div
          id="signup-mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          role="menu"
        >
          <button type="button" onClick={() => handleMenuNav('/')}>
            Back home
          </button>
          <button type="button" onClick={() => handleMenuNav('/login')}>
            Log in
          </button>
        </div>
      </header>

      <main className="container auth-layout">
        <section className="auth-panel side">
          <span className="tag">Get started</span>
          <h1>Create your AuthForge workspace</h1>
          <p className="muted">
            Set up your account and start testing protected
            routes immediately.
          </p>
          <div className="stacked">
            <div className="note-card">
              <h3>Premium UI</h3>
              <p className="muted">
                Dark, bold, and polished visuals that feel like a real SaaS.
              </p>
            </div>
            <div className="note-card">
              <h3>Security-first</h3>
              <p className="muted">
                The backend is built with hashing and token security in mind.
              </p>
            </div>
          </div>
        </section>

        <section className="auth-card accent">
          <div className="auth-card-head">
            <h2>Create account</h2>
            <p className="muted">Start your signup flow in under a minute.</p>
          </div>
          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <div className="split">
              <div>
                <label htmlFor="first-name">First name</label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="Ava"
                  value={form.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'invalid' : ''}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? 'first-name-error' : undefined}
                />
                {errors.firstName ? (
                  <span id="first-name-error" className="error-text">
                    {errors.firstName}
                  </span>
                ) : null}
              </div>
              <div>
                <label htmlFor="last-name">Last name</label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Jordan"
                  value={form.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'invalid' : ''}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? 'last-name-error' : undefined}
                />
                {errors.lastName ? (
                  <span id="last-name-error" className="error-text">
                    {errors.lastName}
                  </span>
                ) : null}
              </div>
            </div>
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="ava@startup.io"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'invalid' : ''}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
            />
            {errors.email ? (
              <span id="signup-email-error" className="error-text">
                {errors.email}
              </span>
            ) : null}
            <label htmlFor="signup-password">Create password</label>
            <div className="input-group">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'invalid' : ''}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signup-password-error' : undefined}
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
              <span id="signup-password-error" className="error-text">
                {errors.password}
              </span>
            ) : null}
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <div className="input-group">
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'invalid' : ''}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? 'signup-confirm-password-error' : undefined
                }
              />
              <button
                className="toggle-visibility"
                type="button"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword ? (
              <span id="signup-confirm-password-error" className="error-text">
                {errors.confirmPassword}
              </span>
            ) : null}
            <button className="btn primary full" type="submit">
              Create account
            </button>
          </form>
          <p className="foot-note">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </main>
      {otpOpen ? (
        <OtpCard
          email={otpEmail}
          title="Verify your email"
          subtitle="Enter the OTP sent to your inbox to activate your account."
          onVerify={handleVerifyOtp}
          onClose={() => setOtpOpen(false)}
        />
      ) : null}
      <LoadingOverlay show={Boolean(loaderMessage)} message={loaderMessage} />
    </div>
  )
}

export default Signup
