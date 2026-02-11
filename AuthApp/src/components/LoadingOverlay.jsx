const LoadingOverlay = ({ show, message }) => {
  if (!show) {
    return null
  }

  return (
    <div className="screen-loader" role="status" aria-live="polite">
      <div className="loader-core">
        <div className="loader-ring" />
        <div className="loader-dot" />
      </div>
      <p>{message || 'Working...'}</p>
    </div>
  )
}

export default LoadingOverlay
