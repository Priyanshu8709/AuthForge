const STORAGE_KEY = 'auth_user'

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const setStoredUser = (user) => {
  if (!user) {
    return
  }
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    }),
  )
}

export const clearStoredUser = () => {
  localStorage.removeItem(STORAGE_KEY)
}
