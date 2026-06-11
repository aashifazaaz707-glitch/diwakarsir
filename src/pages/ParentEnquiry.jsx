import { useState } from 'react';

export default function ParentEnquiry() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you! Your enquiry has been submitted. We will contact you within 24 hours.');
  };

  return (
    <section className="section" style={{ background: 'var(--surface)', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card">
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2>Book a Free Demo</h2>
            <p className="text-muted">Find the perfect tutor for your child.</p>
          </div>
          {status && (
            <div style={{ padding: '1rem', background: '#DCFCE7', color: '#166534', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Parent's Name *</label>
              <input type="text" className="form-input" required placeholder="Enter full name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Student's Class *</label>
                <select className="form-input" required>
                  <option value="">Select Class</option>
                  <option value="1-5">Class 1-5</option>
                  <option value="6-8">Class 6-8</option>
                  <option value="9-10">Class 9-10</option>
                  <option value="11-12">Class 11-12</option>
                  <option value="iit-neet">IIT/NEET</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Location in Patna *</label>
                <input type="text" className="form-input" required placeholder="e.g. Kankarbagh" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input type="tel" className="form-input" required placeholder="10-digit number" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
