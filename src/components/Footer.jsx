export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-alt)', padding: '5rem 0 2rem', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '3rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Diwakar Tutors</h3>
            <p style={{ color: 'var(--text)', maxWidth: '280px' }}>
              The most trusted home tuition platform in Patna. Connecting exceptional tutors with ambitious students.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem' }}>Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="nav-links">About Us</a></li>
              <li><a href="#" className="nav-links">Verified Tutors</a></li>
              <li><a href="#" className="nav-links">Parent Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem' }}>Contact</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="nav-links">support@diwakartutors.com</a></li>
              <li><a href="#" className="nav-links">+91 73014 55882</a></li>
              <li><a href="#" className="nav-links">Patna, Bihar</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center" style={{ fontSize: '0.875rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} Diwakar Sir Home Tutors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
