import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 500 }}>
            <span style={{ color: 'var(--accent)' }}>★</span> 5.0 Rated by Parents
          </div>
          <h1 className="hero-title">
            The Standard for <br/>
            <span style={{ color: 'var(--accent)' }}>Home Tuition</span> in Patna
          </h1>
          <p className="hero-subtitle">
            Premium, personalized 1-on-1 education. Verified tutors for K-12, IIT-JEE, and NEET delivered right to your doorstep.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/parent-enquiry" className="btn btn-primary">
              Book Free Demo
            </Link>
            <Link to="/tutor-enquiry" className="btn btn-outline">
              Join as Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>1000+</div>
              <div style={{ color: 'var(--text-muted)' }}>Students Taught</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>700+</div>
              <div style={{ color: 'var(--text-muted)' }}>Verified Tutors</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>100%</div>
              <div style={{ color: 'var(--text-muted)' }}>Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="about">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2>Why Choose Us</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
              We bring structure, trust, and exceptional quality to home education.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="card text-center flex flex-col items-center">
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                <ShieldCheck size={32} />
              </div>
              <h3>Verified Tutors</h3>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>Rigorous background checks and qualification verification for absolute peace of mind.</p>
            </div>
            <div className="card text-center flex flex-col items-center">
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                <Users size={32} />
              </div>
              <h3>1-on-1 Focus</h3>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>Personalized attention ensuring your child learns at their optimal pace and style.</p>
            </div>
            <div className="card text-center flex flex-col items-center">
              <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                <GraduationCap size={32} />
              </div>
              <h3>Expert Coaching</h3>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>Specialized tutors for board exams, IIT-JEE, and NEET preparations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container flex flex-col items-center text-center">
          <h2>Ready to accelerate learning?</h2>
          <p className="text-muted" style={{ margin: '1rem 0 2rem', maxWidth: '500px' }}>
            Get matched with the perfect tutor within 24 hours. Your first demo class is completely free.
          </p>
          <Link to="/parent-enquiry" className="btn btn-primary gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
