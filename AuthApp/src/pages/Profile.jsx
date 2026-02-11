import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingOverlay from '../components/LoadingOverlay.jsx'
import { apiGet, apiPost } from '../utils/api.js'
import { clearStoredUser, setStoredUser } from '../utils/authStorage.js'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'AF'

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiGet('/profile')
        setUser(data.user)
        setStoredUser(data.user)
      } catch (error) {
        toast.error(error.message || 'Please log in.')
        clearStoredUser()
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await apiPost('/logout', {})
    } catch {
      // ignore logout failures
    } finally {
      clearStoredUser()
      toast.success('Logged out successfully.')
      navigate('/')
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
          <button className="btn outline" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="container auth-layout">
        <section className="auth-panel side profile-panel">
          <span className="tag">Profile</span>
          <h1>Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
          <p className="muted">
            Your secure workspace details and verification status live here.
          </p>
          <div className="stacked">
            <div className="note-card">
              <h3>Session status</h3>
              <p className="muted">OTP verified access is active.</p>
            </div>
            <div className="note-card">
              <h3>Account status</h3>
              <p className="muted">{user?.isVerified ? 'Verified user' : 'Pending verification'}</p>
            </div>
          </div>
        </section>

        <section className="auth-card accent profile-card">
          <div className="profile-hero">
            <div className="profile-avatar">{initials}</div>
            <div>
              <h2>Profile details</h2>
              <p className="muted">Account information.</p>
            </div>
          </div>
          <button
            className="btn outline profile-logout-mobile"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>

          {loading ? (
            <div className="profile-skeleton">
              <div className="skeleton-line wide" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
            </div>
          ) : (
            <div className="profile-grid">
              <div>
                <span className="profile-label">Name</span>
                <p className="profile-value">{user?.name || '-'}</p>
              </div>
              <div>
                <span className="profile-label">Email</span>
                <p className="profile-value">{user?.email || '-'}</p>
              </div>
              <div>
                <span className="profile-label">Verified</span>
                <p className="profile-value">{user?.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <span className="profile-label">Member since</span>
                <p className="profile-value">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
      <LoadingOverlay show={loading} message="Loading profile..." />
    </div>
  )
}

export default Profile
