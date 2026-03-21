// Footer Component - Bottom footer with app info
const Footer = () => {
  return (
    <footer
      className="footer"
      id="main-footer"
      style={{
        textAlign: 'center',
        padding: '1.5rem 2rem',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        marginLeft: 'var(--sidebar-width)',
      }}
    >
      <p>
        © 2026 NutriVision AI — Powered by TensorFlow.js &amp; React
      </p>
    </footer>
  );
};

export default Footer;
