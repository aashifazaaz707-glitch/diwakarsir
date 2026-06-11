export default function Footer() {
  return (
    <footer style={{ background: 'var(--background)', padding: '6rem 0 3rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '4rem' }}>
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ background: 'var(--gradient-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DIWAKAR</span>
            </h3>
            <p style={{ maxWidth: '250px' }}>
              Elevating the standard of home education in Patna. Elite tutors, exceptional results.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Platform</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="nav-links">About the Ecosystem</a></li>
              <li><a href="#" className="nav-links">Verified Tutors</a></li>
              <li><a href="#" className="nav-links">Results & Success</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'white' }}>Legal & Contact</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="nav-links">Privacy Architecture</a></li>
              <li><a href="#" className="nav-links">Terms of Service</a></li>
              <li><a href="#" className="nav-links">contact@diwakar.edu</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center" style={{ fontSize: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3rem', color: 'var(--text-secondary)' }}>
          &copy; {new Date().getFullYear()} Diwakar Sir Home Tutors. Designed for Excellence.
        </div>
      </div>
    </footer>
  );
}
