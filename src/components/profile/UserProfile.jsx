import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const userName = user?.name || user?.email?.split('@')[0] || 'Health Enthusiast';

  return (
    <div className="glass-card user-profile-card">
      <div className="user-profile-card__item">
        <div className="user-profile-card__icon"><User size={20} /></div>
        <div className="user-profile-card__info">
          <span className="user-profile-card__label">Display Name</span>
          <span className="user-profile-card__value">{userName}</span>
        </div>
      </div>
      
      <div className="user-profile-card__item">
        <div className="user-profile-card__icon"><Mail size={20} /></div>
        <div className="user-profile-card__info">
          <span className="user-profile-card__label">Email Address</span>
          <span className="user-profile-card__value">{user?.email || 'N/A'}</span>
        </div>
      </div>

      <div className="user-profile-card__item">
        <div className="user-profile-card__icon"><Shield size={20} /></div>
        <div className="user-profile-card__info">
          <span className="user-profile-card__label">Account Status</span>
          <span className="user-profile-card__value" style={{ color: '#10b981' }}>Active Pro</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
