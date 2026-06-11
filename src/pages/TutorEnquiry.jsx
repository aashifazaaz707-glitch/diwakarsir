import { useState } from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function TutorEnquiry() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Application submitted. Our academic board will review your profile and contact you within 48 hours.');
  };

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '120px', position: 'relative' }}>
      <div className="glow-bg"></div>
      <div className="container" style={{ maxWidth: '640px' }}>
        
        <div className="text-center animate-fade-up" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 0, 127, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 0, 127, 0.2)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent-secondary)' }}>
            <GraduationCap size={16} /> 
            <span>Educator Portal</span>
          </div>
          <h2>Join as an Elite Tutor</h2>
          <p style={{ marginTop: '1rem' }}>Empower the next generation while maintaining full control over your schedule and earnings.</p>
        </div>

        <div className="card animate-fade-up delay-1">
          {status ? (
            <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--gradient-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span style={{ color: 'white', fontSize: '1.5rem' }}>✓</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Application Under Review</h3>
              <p>{status}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Legal Name</label>
                <input type="text" className="form-input" required placeholder="Enter your name" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Highest Academic Qualification</label>
                <input type="text" className="form-input" required placeholder="e.g., M.Sc Mathematics, IIT Patna" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Core Subjects</label>
                  <input type="text" className="form-input" required placeholder="e.g., Advanced Physics" />
                </div>
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input type="number" className="form-input" required placeholder="e.g., 4" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label className="form-label">Mobile Number</label>
                <input type="tel" className="form-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
              </div>
              
              <button type="submit" className="btn btn-gradient gap-2" style={{ width: '100%' }}>
                <span>Submit Educator Profile</span> <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
