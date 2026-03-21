// Navbar Component - Top navigation bar with brand, search, and user avatar
import '../../styles/components/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">
          {/* Logo icon will go here */}
          🧠
        </div>
        <span className="navbar__title">NutriVision AI</span>
      </div>

      <div className="navbar__actions">
        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search foods..."
            id="search-input"
          />
        </div>
        <div className="navbar__avatar" id="user-avatar">
          U
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
