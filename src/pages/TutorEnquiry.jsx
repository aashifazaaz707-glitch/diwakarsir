import { useState } from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function TutorEnquiry() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Application submitted successfully! Our team will review your qualifications and contact you shortly.');
  };

  return (
    <section className="section section-alt" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <div className="badge" style={{ marginBottom: '1.5rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
            <GraduationCap size={16} /> 
            <span>Tutor Registration</span>
          </div>
          <h2>Join as a Home Tutor</h2>
          <p style={{ marginTop: '0.75rem', fontSize: '1.125rem' }}>Teach students in Patna, set your own schedule, and earn well.</p>
        </div>

        <div className="card">
          {status ? (
            <div style={{ padding: '2rem', background: '#ecfdf5', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid #a7f3d0' }}>
              <div style={{ width: '48px', height: '48px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</span>
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#065f46' }}>Application Received</h3>
              <p style={{ color: '#047857' }}>{status}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" required placeholder="Enter your full name" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Highest Qualification</label>
                <input type="text" className="form-input" required placeholder="e.g. B.Tech, M.Sc Mathematics" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Subjects You Teach</label>
                  <input type="text" className="form-input" required placeholder="e.g. Physics, Maths" />
                </div>
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input type="number" className="form-input" required placeholder="e.g. 3" min="0" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label className="form-label">Mobile Number</label>
                <input type="tel" className="form-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
              </div>
              
              <button type="submit" className="btn btn-primary gap-2" style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}>
                <span>Submit Application</span> <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
