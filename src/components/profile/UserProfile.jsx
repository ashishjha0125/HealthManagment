// UserProfile Component - Displays and edits user profile info

const UserProfile = () => {
  // TODO: Connect to UserContext
  return (
    <div className="glass-card" id="user-profile">
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-heading)' }}>
        Personal Information
      </h3>
      {/* Form fields will be implemented here */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Profile settings will be implemented here.
      </p>
    </div>
  );
};

export default UserProfile;
