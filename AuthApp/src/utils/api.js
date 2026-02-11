const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1'

const parseJson = async (response) => {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

export const apiPost = async (path, payload) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  const data = await parseJson(response)
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export const apiGet = async (path) => {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
  })

  const data = await parseJson(response)
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export { API_BASE }
