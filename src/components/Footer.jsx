export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', padding: '4rem 0 2rem', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '3rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Diwakar Tutors</h3>
            <p className="text-muted">Premium home tuition services connecting top educators with dedicated students.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Company</h4>
            <ul className="flex flex-col gap-2 text-muted">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Legal</h4>
            <ul className="flex flex-col gap-2 text-muted">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-muted" style={{ fontSize: '0.875rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          &copy; {new Date().getFullYear()} Diwakar Sir Home Tutors. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
