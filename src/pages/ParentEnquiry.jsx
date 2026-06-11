import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ParentEnquiry() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Success! Your inquiry is in our system. A senior placement director will reach out shortly.');
  };

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '120px', position: 'relative' }}>
      <div className="glow-bg"></div>
      <div className="container" style={{ maxWidth: '640px' }}>
        
        <div className="text-center animate-fade-up" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(138, 43, 226, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(138, 43, 226, 0.2)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent)' }}>
            <Sparkles size={16} /> 
            <span>Complimentary Assessment</span>
          </div>
          <h2>Book a Free Demo</h2>
          <p style={{ marginTop: '1rem' }}>Take the first step towards academic excellence. Tell us about your child's needs.</p>
        </div>

        <div className="card animate-fade-up delay-1">
          {status ? (
            <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--gradient-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span style={{ color: 'white', fontSize: '1.5rem' }}>✓</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Application Received</h3>
              <p>{status}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Parent's Full Name</label>
                <input type="text" className="form-input" required placeholder="John Doe" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Student's Grade Level</label>
                  <select className="form-input" required style={{ appearance: 'none' }}>
                    <option value="" disabled selected>Select Grade</option>
                    <option value="1-5">Primary (Grades 1-5)</option>
                    <option value="6-8">Middle (Grades 6-8)</option>
                    <option value="9-10">High (Grades 9-10)</option>
                    <option value="11-12">Senior (Grades 11-12)</option>
                    <option value="iit-neet">Specialized (IIT-JEE / NEET)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location in Patna</label>
                  <input type="text" className="form-input" required placeholder="e.g., Kankarbagh" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label className="form-label">Mobile Number</label>
                <input type="tel" className="form-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
              </div>
              
              <button type="submit" className="btn btn-gradient gap-2" style={{ width: '100%' }}>
                <span>Submit Application</span> <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
