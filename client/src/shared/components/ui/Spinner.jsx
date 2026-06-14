const Spinner = ({ size = 20, className = "" }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={`animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 ${className}`}
    />
  )
}

export default Spinner
