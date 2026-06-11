import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--secondary)' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            padding: '0.45rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span style={{ letterSpacing: '-0.025em', fontWeight: 800 }}>Diwakar Tutors</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hide-on-mobile flex items-center gap-8">
          <Link to="/" style={{ fontWeight: 600, color: 'var(--text)' }}>Home</Link>
          <a href="/#about" style={{ fontWeight: 600, color: 'var(--text)' }}>Why Us</a>
          <Link to="/tutor-enquiry" style={{ fontWeight: 600, color: 'var(--text)' }}>Become a Tutor</Link>
          <Link to="/parent-enquiry" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}>
            Book Free Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="/#about" onClick={() => setIsOpen(false)}>Why Us</a>
          <Link to="/tutor-enquiry" onClick={() => setIsOpen(false)}>Become a Tutor</Link>
          <Link to="/parent-enquiry" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
            Book Free Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
