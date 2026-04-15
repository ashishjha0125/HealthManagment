import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/profile/UserProfile';
import GoalSettings from '../components/profile/GoalSettings';
import { LogOut } from 'lucide-react';
import '../styles/pages/profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  
  // Extract user details securely
  const userName = user?.name || user?.email?.split('@')[0] || 'Health Enthusiast';
  const userEmail = user?.email || 'No email attached';
  const userAvatar = user?.avatarUrl || null;
  const userInitials = user?.avatar || userName.charAt(0).toUpperCase();

  return (
    <div className="page-profile" id="page-profile">
      {/* Premium Header */}
      <div className="page-profile__header glass-card">
        <div className="page-profile__header-content">
          <div className="page-profile__avatar-container">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="page-profile__avatar-img" />
            ) : (
              <div className="page-profile__avatar">{userInitials}</div>
            )}
          </div>
          <div className="page-profile__user-info">
            <h1 className="page-profile__name">{userName}</h1>
            <p className="page-profile__email">{userEmail}</p>
            <span className="page-profile__badge">Pro Member</span>
          </div>
        </div>
        
        <button onClick={logout} className="page-profile__logout-btn">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="page-profile__grid">
        <div className="page-profile__column">
          <h2 className="page-profile__section-title">Target Goals (Rotation Wheel)</h2>
          <GoalSettings />
        </div>
        
        <div className="page-profile__column">
          <h2 className="page-profile__section-title">Personal Details</h2>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
