// Loader Component - Reusable loading spinner
const Loader = ({ text = 'Loading...', size = 48 }) => {
  return (
    <div
      className="loader"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '3rem',
      }}
    >
      <div
        className="loader__spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        {text}
      </p>
    </div>
  );
};

export default Loader;
