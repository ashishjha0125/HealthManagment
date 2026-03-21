// Profile Page - User profile and goal settings
import UserProfile from '../components/profile/UserProfile';
import GoalSettings from '../components/profile/GoalSettings';
import '../styles/pages/profile.css';

const Profile = () => {
  return (
    <div className="page-profile" id="page-profile">
      <div className="page-profile__header">
        <div className="page-profile__avatar">U</div>
        <h1 className="page-profile__name">User Name</h1>
        <p className="page-profile__email">user@example.com</p>
      </div>

      <div className="page-profile__section">
        <h2 className="page-profile__section-title">Profile Settings</h2>
        <UserProfile />
      </div>

      <div className="page-profile__section">
        <h2 className="page-profile__section-title">Nutrition Goals</h2>
        <GoalSettings />
      </div>
    </div>
  );
};

export default Profile;
