import { useState } from 'react'

const OtpCard = ({ email, title, subtitle, onVerify, onClose }) => {
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const cleaned = otp.replace(/\D/g, '') // remove any non-digit chars
    if (!cleaned) {
      return
    }
    setSubmitting(true)
    try {
      const ok = await onVerify(cleaned)
      if (ok) {
        setOtp('')
      }
    } catch {
      // errors are handled by the caller
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="otp-overlay" role="dialog" aria-modal="true">
      <div className="otp-card">
        <div className="otp-head">
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
          <p className="muted small">Code sent to {email}</p>
        </div>
        <form className="otp-form" onSubmit={handleSubmit}>
          <label htmlFor="otp-input">Enter your OTP</label>
          <input
            id="otp-input"
            name="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="6-digit code"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
          <div className="otp-actions">
            <button className="btn outline" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn primary" type="submit" disabled={submitting}>
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OtpCard
