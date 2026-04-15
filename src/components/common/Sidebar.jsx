// Sidebar Component - Side navigation with Lucide icons and calorie summary
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Camera, ClipboardList, User, Flame } from 'lucide-react';
import { useMeals } from '../../context/MealContext';
import '../../styles/components/sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { todaysTotals, goals } = useMeals();
  const percent = Math.min((todaysTotals.calories / goals.calories) * 100, 100);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: 'Scan Food', icon: Camera },
    { path: '/history', label: 'History', icon: ClipboardList },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--open' : ''}`}
        onClick={closeSidebar}
      />
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} id="main-sidebar">
        <nav className="sidebar__nav" onClick={closeSidebar}>
        <span className="sidebar__section-title">Menu</span>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              end={item.path === '/'}
            >
              <Icon size={18} className="sidebar__link-icon" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar__divider" />

      <div className="sidebar__calorie-summary">
        <div className="sidebar__calorie-title">
          <Flame size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Today's Calories
        </div>
        <div className="sidebar__calorie-value">{Math.round(todaysTotals.calories)}</div>
        <div className="sidebar__calorie-goal">of {goals.calories.toLocaleString()} kcal goal</div>
        <div className="sidebar__progress">
          <div
            className="sidebar__progress-bar"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
