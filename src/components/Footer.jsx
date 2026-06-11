export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-alt)', padding: '5rem 0 2rem', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '3rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                padding: '0.4rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(249, 115, 22, 0.15)'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', letterSpacing: '-0.025em' }}>Diwakar Tutors</span>
            </div>
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
