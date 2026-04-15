// NotFound Page - 404 error page with Lucide icons
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div
      id="page-not-found"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        animation: 'fadeInUp 0.5s ease-out',
      }}
    >
      <UtensilsCrossed size={80} style={{ marginBottom: '1rem', color: 'var(--text-muted)', opacity: 0.4 }} />
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 800,
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.5rem',
      }}>
        404
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Oops! This page doesn't exist on the menu.
      </p>
      <Link to="/" className="btn btn--primary">
        <Home size={16} />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
