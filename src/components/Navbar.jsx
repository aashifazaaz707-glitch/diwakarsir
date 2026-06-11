import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
          <BookOpen size={24} color="var(--accent)" />
          <span>Diwakar Tutors</span>
        </Link>
        <div className="nav-links flex items-center gap-8">
          <Link to="/">Home</Link>
          <a href="/#about">About</a>
          <Link to="/parent-enquiry" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            Book Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
