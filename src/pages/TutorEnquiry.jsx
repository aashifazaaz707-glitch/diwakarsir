import { useState } from 'react';

export default function TutorEnquiry() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you! Your application has been received. Our team will verify and contact you.');
  };

  return (
    <section className="section" style={{ background: 'var(--surface)', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card">
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2>Join as a Tutor</h2>
            <p className="text-muted">Empower students and earn well with your expertise.</p>
          </div>
          {status && (
            <div style={{ padding: '1rem', background: '#DCFCE7', color: '#166534', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" className="form-input" required placeholder="Enter full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Highest Qualification *</label>
              <input type="text" className="form-input" required placeholder="e.g. B.Tech, M.Sc" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Subjects You Can Teach *</label>
                <input type="text" className="form-input" required placeholder="e.g. Math, Physics" />
              </div>
              <div className="form-group">
                <label className="form-label">Experience (Years) *</label>
                <input type="number" className="form-input" required placeholder="e.g. 2" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input type="tel" className="form-input" required placeholder="10-digit number" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
