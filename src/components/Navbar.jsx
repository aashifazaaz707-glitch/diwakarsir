import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
          <div style={{ background: 'var(--gradient-glow)', padding: '0.25rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="white" />
          </div>
          <span>DIWAKAR</span>
        </Link>
        <div className="nav-links flex items-center gap-8">
          <Link to="/">Home</Link>
          <a href="/#about">Platform</a>
          <Link to="/tutor-enquiry">Tutors</Link>
          <Link to="/parent-enquiry" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}>
            Book Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
