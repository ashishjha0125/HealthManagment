import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Sun, Moon, Brain, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';
import '../../styles/components/navbar.css';

const Navbar = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar__brand">
        <button className="navbar__menu-btn mobile-only" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
        <div className="navbar__logo">
          <Brain size={20} color="#fff" />
        </div>
        <span className="navbar__title">NutriVision AI</span>
      </div>

      <div className="navbar__actions">
        <button 
          className="navbar__scan-btn"
          onClick={() => navigate('/upload')}
          title="Scan your meal"
        >
          <Camera size={16} />
          <span>Scan Food</span>
        </button>

        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          id="theme-toggle"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Avatar Dropdown */}
        <div className="navbar__user" ref={menuRef}>
          <button
            className="navbar__avatar"
            id="user-avatar"
            onClick={() => setShowMenu((p) => !p)}
            style={user?.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})`, backgroundSize: 'cover' } : {}}
          >
            {!user?.avatarUrl && (user?.avatar || 'U')}
          </button>

          {showMenu && (
            <div className="navbar__dropdown">
              <div className="navbar__dropdown-header">
                <p className="navbar__dropdown-name">{user?.name || 'User'}</p>
                <p className="navbar__dropdown-email">{user?.email || ''}</p>
              </div>
              <div className="navbar__dropdown-divider" />
              <button 
                className="navbar__dropdown-item" 
                onClick={() => { 
                  setShowMenu(false); 
                  navigate('/profile'); 
                }}
              >
                <User size={15} />
                Profile
              </button>
              <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={logout}>
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
