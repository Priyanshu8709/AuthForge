import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../utils/api.js'
import { clearStoredUser, getStoredUser, setStoredUser } from '../utils/authStorage.js'

const Home = () => {
  const [user, setUser] = useState(getStoredUser())

  useEffect(() => {
    let mounted = true
    const refreshUser = async () => {
      if (!user) return
      try {
        const data = await apiGet('/profile')
        if (!mounted) return
        setStoredUser(data.user)
        setUser(data.user)
      } catch {
        if (!mounted) return
        clearStoredUser()
        setUser(null)
      }
    }

    refreshUser()
    return () => {
      mounted = false
    }
  }, [user])
  return (
    <div className="page home">
      <div className="ambient glow-one" aria-hidden="true" />
      <div className="ambient glow-two" aria-hidden="true" />
      <div className="ambient glow-three" aria-hidden="true" />

      <header className="nav container">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>AuthForge</span>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name?.split(' ')[0] || 'User'}</span>
              <Link className="btn primary" to="/profile">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link className="btn ghost" to="/login">
                Log in
              </Link>
              <Link className="btn primary" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="hero container reveal">
        <section className="hero-copy">
          <span className="tag">Auth App Project</span>
          <h1>Designing secure login and signup flows for modern SaaS teams.</h1>
          <p>
            AuthForge is my authentication app focused on fast onboarding,
            protected routes, and a polished security experience. The goal is a
            clean flow from sign up to verified access with smooth UI states.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link className="btn primary" to="/profile">
                Go to profile
              </Link>
            ) : (
              <>
                <Link className="btn primary" to="/signup">
                  Create account
                </Link>
                <Link className="btn outline" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">JWT</span>
              <span className="stat-label">Session tokens</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">Bcrypt</span>
              <span className="stat-label">Password hashing</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">2FA</span>
              <span className="stat-label">Future-ready</span>
            </div>
          </div>
        </section>

        <section className="hero-card">
          <div className="card-header">
            <span className="eyebrow">Project Overview</span>
            <h2>AuthForge platform scope</h2>
            <p className="muted">
              Building an authentication system with a clear UX and scalable
              backend services.
            </p>
          </div>
          <ul className="checklist">
            <li>
              <span className="check" aria-hidden="true" />
              Login and signup with validation
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              Protected routes
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              Activity logs and security alerts
            </li>
            <li>
              <span className="check" aria-hidden="true" />
              Branded UI for a SaaS feel
            </li>
          </ul>
          <div className="chip-row">
            <span>React + Vite</span>
            <span>Node + Express</span>
            <span>MongoDB</span>
          </div>
        </section>
      </main>

      <section className="section container reveal delay-1" id="features">
        <div className="section-head">
          <h2>Core features</h2>
          <p className="muted">
            Focused on authentication essentials with a premium UI.
          </p>
        </div>
        <div className="grid three">
          <article className="info-card">
            <h3>Smart onboarding</h3>
            <p>
              Minimal signup steps with instant feedback, strong password rules,
              and clear success states.
            </p>
          </article>
          <article className="info-card">
            <h3>Secure access</h3>
            <p>
              Session handling, device awareness, and token refresh flows built
              to scale.
            </p>
          </article>
          <article className="info-card">
            <h3>Analytics-ready</h3>
            <p>
              Track signups, logins, and auth errors to understand conversion
              health.
            </p>
          </article>
        </div>
      </section>

      <section className="section container reveal delay-2" id="project">
        <div className="section-head">
          <h2>Project details</h2>
          <p className="muted">
            This app is built to prove authentication UX and backend fundamentals
            in a complete flow.
          </p>
        </div>
        <div className="grid two">
          <article className="info-card highlight">
            <h3>Experience goals</h3>
            <p>
              I am crafting a login and signup flow with clear validation,
              smooth transitions, and a bold dark theme so the app feels like a
              polished SaaS product.
            </p>
            <div className="pill-row">
              <span>Fast feedback</span>
              <span>Accessible UI</span>
              <span>Consistent layout</span>
            </div>
          </article>
          <article className="info-card">
            <h3>Security focus</h3>
            <p>
              Password hashing, token-based sessions, and protected routes are
              the core of the backend. The UI mirrors that security-first feel
              with clear messaging.
            </p>
          </article>
        </div>
      </section>

      <section className="section container reveal delay-3" id="roadmap">
        <div className="section-head">
          <h2>Roadmap</h2>
          <p className="muted">
            Current priorities and what is coming next.
          </p>
        </div>
        <div className="grid three">
          <article className="info-card">
            <h3>Phase 1</h3>
            <p>Login, signup, form validation, and UI states.</p>
          </article>
          <article className="info-card">
            <h3>Phase 2</h3>
            <p>Profile edits, password resets, and email verification.</p>
          </article>
          <article className="info-card">
            <h3>Phase 3</h3>
            <p>Admin dashboard, audit logs, and MFA options.</p>
          </article>
        </div>
      </section>

      <footer className="footer container reveal delay-3">
        <div>
          <h3>Ready to explore?</h3>
          <p className="muted">
            Test the login and signup flows built for this project.
          </p>
          <p className="muted small">© 2026 AuthForge. Crafted for secure access.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
