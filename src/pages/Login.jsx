// Login Page - Authentication with Login/Signup toggle
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Brain, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/login.css';

const Login = () => {
  const { login, signup, googleLogin, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (isSignup && !form.name) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    let result;
    if (isSignup) {
      result = await signup(form.name, form.email, form.password);
    } else {
      result = await login(form.email, form.password);
    }

    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    await googleLogin();
    setGoogleLoading(false);
  };

  return (
    <div className="login-page">
      {/* Decorative background */}
      <div className="login-page__bg">
        <div className="login-page__bg-circle login-page__bg-circle--1" />
        <div className="login-page__bg-circle login-page__bg-circle--2" />
        <div className="login-page__bg-circle login-page__bg-circle--3" />
      </div>

      <div className="login-card">
        {/* Header */}
        <div className="login-card__header">
          <div className="login-card__logo">
            <Brain size={28} color="#fff" />
          </div>
          <h1 className="login-card__title">NutriVision AI</h1>
          <p className="login-card__subtitle">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {/* Form */}
        <form className="login-card__form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="login-card__field">
              <User size={18} className="login-card__field-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="login-card__input"
                autoComplete="name"
              />
            </div>
          )}

          <div className="login-card__field">
            <Mail size={18} className="login-card__field-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="login-card__input"
              autoComplete="email"
            />
          </div>

          <div className="login-card__field">
            <Lock size={18} className="login-card__field-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="login-card__input"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
            <button
              type="button"
              className="login-card__eye"
              onClick={() => setShowPassword((p) => !p)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="login-card__error">{error}</div>
          )}

          <button
            type="submit"
            className="login-card__submit"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <span className="login-card__spinner" />
            ) : (
              <>
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-card__divider">
          <span>Or continue with</span>
        </div>

        <button 
          className="login-card__google-btn" 
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <span className="login-card__spinner login-card__spinner--dark" />
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </>
          )}
        </button>

        {/* Toggle Login/Signup */}
        <div className="login-card__footer">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button className="login-card__switch" onClick={switchMode}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
