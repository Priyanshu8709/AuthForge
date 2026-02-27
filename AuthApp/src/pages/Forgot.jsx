import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingOverlay from '../components/LoadingOverlay.jsx'
import { apiPost } from '../utils/api.js'

const Forgot = () => {
  const [step, setStep] = useState('request') // request -> reset
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loaderMessage, setLoaderMessage] = useState('')
  const navigate = useNavigate()

  const validateRequest = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email address.'
    return next
  }

  const validateReset = () => {
    const next = {}
    if (!otp.trim()) next.otp = 'OTP is required.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters.'
    return next
  }

  const handleRequest = async (e) => {
    e.preventDefault()
    const nextErrors = validateRequest()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      toast.error('Please fix the highlighted fields.')
      return
    }
    try {
      setLoaderMessage('Sending OTP...')
      await apiPost('/forgot-password', { email: email.trim() })
      toast.success('OTP sent to your email.')
      setStep('reset')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoaderMessage('')
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    const nextErrors = validateReset()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      toast.error('Please fix the highlighted fields.')
      return
    }
    try {
      setLoaderMessage('Resetting password...')
      await apiPost('/reset-password', {
        email: email.trim(),
        otp,
        newPassword: password,
      })
      toast.success('Password reset successfully. You can now log in.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
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
      </header>

      <main className="container auth-layout">
        <section className="auth-panel side">
          <span className="tag">Need help?</span>
          <h1>Reset your password</h1>
          <p className="muted">
            Enter your email to receive a one‑time code, then choose a new
            password.
          </p>
        </section>

        <section className="auth-card accent">
          <div className="auth-card-head">
            <h2>Forgot password</h2>
          </div>
          {step === 'request' ? (
            <form className="auth-form" noValidate onSubmit={handleRequest}>
              <label htmlFor="forgot-email">Email address</label>
              <input
                id="forgot-email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'invalid' : ''}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'forgot-email-error' : undefined}
              />
              {errors.email ? (
                <span id="forgot-email-error" className="error-text">
                  {errors.email}
                </span>
              ) : null}
              <button className="btn primary full" type="submit">
                Send OTP
              </button>
            </form>
          ) : (
            <form className="auth-form" noValidate onSubmit={handleReset}>
              <label htmlFor="reset-otp">One-time code</label>
              <input
                id="reset-otp"
                name="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={errors.otp ? 'invalid' : ''}
                aria-invalid={Boolean(errors.otp)}
                aria-describedby={errors.otp ? 'reset-otp-error' : undefined}
              />
              {errors.otp ? (
                <span id="reset-otp-error" className="error-text">
                  {errors.otp}
                </span>
              ) : null}

              <label htmlFor="reset-password">New password</label>
              <input
                id="reset-password"
                name="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'invalid' : ''}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'reset-password-error' : undefined}
              />
              {errors.password ? (
                <span id="reset-password-error" className="error-text">
                  {errors.password}
                </span>
              ) : null}

              <button className="btn primary full" type="submit">
                Reset password
              </button>
            </form>
          )}
        </section>
      </main>
      <LoadingOverlay show={Boolean(loaderMessage)} message={loaderMessage} />
    </div>
  )
}

export default Forgot
