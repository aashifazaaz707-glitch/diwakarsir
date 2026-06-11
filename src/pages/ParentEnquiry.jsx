import { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function ParentEnquiry() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Success! Your inquiry is in our system. Our team will call you shortly to arrange your free demo.');
  };

  return (
    <section className="section section-alt" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <div className="badge" style={{ marginBottom: '1.5rem' }}>
            <Star size={16} fill="var(--accent)" color="var(--accent)" /> 
            <span>100% Free Demo Class</span>
          </div>
          <h2>Book Your Free Demo</h2>
          <p style={{ marginTop: '0.75rem', fontSize: '1.125rem' }}>Find the perfect verified home tutor for your child today.</p>
        </div>

        <div className="card">
          {status ? (
            <div style={{ padding: '2rem', background: '#ecfdf5', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid #a7f3d0' }}>
              <div style={{ width: '48px', height: '48px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</span>
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#065f46' }}>Request Received</h3>
              <p style={{ color: '#047857' }}>{status}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Parent's Full Name</label>
                <input type="text" className="form-input" required placeholder="e.g. Rahul Sharma" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Student's Class</label>
                  <select className="form-input" required style={{ appearance: 'none', background: 'var(--bg-alt)' }}>
                    <option value="" disabled selected>Select Class</option>
                    <option value="1-5">Class 1 to 5</option>
                    <option value="6-8">Class 6 to 8</option>
                    <option value="9-10">Class 9 to 10</option>
                    <option value="11-12">Class 11 to 12</option>
                    <option value="iit-neet">IIT-JEE / NEET</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location in Patna</label>
                  <input type="text" className="form-input" required placeholder="e.g. Kankarbagh" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label className="form-label">Mobile Number</label>
                <input type="tel" className="form-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
              </div>
              
              <button type="submit" className="btn btn-primary gap-2" style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}>
                <span>Submit Details</span> <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
