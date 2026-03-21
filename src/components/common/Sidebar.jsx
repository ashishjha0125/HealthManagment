// Sidebar Component - Side navigation with links and calorie summary
import { NavLink } from 'react-router-dom';
import '../../styles/components/sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/upload', label: 'Scan Food', icon: '📸' },
    { path: '/history', label: 'History', icon: '📋' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar" id="main-sidebar">
      <nav className="sidebar__nav">
        <span className="sidebar__section-title">Menu</span>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            end={item.path === '/'}
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__divider" />

      <div className="sidebar__calorie-summary">
        <div className="sidebar__calorie-title">Today's Calories</div>
        <div className="sidebar__calorie-value">0</div>
        <div className="sidebar__calorie-goal">of 2,000 kcal goal</div>
        <div className="sidebar__progress">
          <div
            className="sidebar__progress-bar"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
