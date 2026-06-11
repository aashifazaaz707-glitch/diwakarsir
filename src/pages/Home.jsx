import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
        <div className="glow-bg"></div>
        <div className="container text-center">
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', marginBottom: '2.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            <Sparkles size={16} color="var(--accent-secondary)" /> 
            <span>Redefining Education in Patna</span>
          </div>
          
          <h1 className="animate-fade-up delay-1">
            Elite Home Tuition. <br/>
            Uncompromising Quality.
          </h1>
          
          <p className="animate-fade-up delay-2" style={{ maxWidth: '650px', margin: '0 auto 3.5rem', fontSize: '1.25rem' }}>
            Experience personalized 1-on-1 education designed for excellence. We connect top-tier verified educators with students striving for academic greatness in K-12, IIT-JEE, and NEET.
          </p>
          
          <div className="flex items-center justify-center gap-4 animate-fade-up delay-3 hero-buttons">
            <Link to="/parent-enquiry" className="btn btn-gradient gap-2">
              <span>Book Your Free Demo</span> <ArrowRight size={18} />
            </Link>
            <Link to="/tutor-enquiry" className="btn btn-outline">
              Apply as Educator
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="animate-fade-up">
              <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.25rem', background: 'var(--gradient-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1,000+</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem' }}>Students Mentored</div>
            </div>
            <div className="animate-fade-up delay-1">
              <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.25rem', background: 'var(--gradient-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>700+</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem' }}>Verified Elite Tutors</div>
            </div>
            <div className="animate-fade-up delay-2">
              <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.25rem', background: 'var(--gradient-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100%</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem' }}>Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section" id="about">
        <div className="container">
          <div className="text-center animate-fade-up" style={{ marginBottom: '5rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>The Diwakar Advantage</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We don't just send tutors; we provide a structured ecosystem designed to guarantee results, safety, and transparency.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="card animate-fade-up">
              <div style={{ width: '64px', height: '64px', background: 'rgba(138, 43, 226, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', border: '1px solid rgba(138, 43, 226, 0.2)' }}>
                <ShieldCheck size={32} color="var(--accent)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Vetted Excellence</h3>
              <p>Every educator passes a rigorous multi-stage background check, interview, and subject-matter expertise validation.</p>
            </div>
            <div className="card animate-fade-up delay-1">
              <div style={{ width: '64px', height: '64px', background: 'rgba(255, 0, 127, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', border: '1px solid rgba(255, 0, 127, 0.2)' }}>
                <Users size={32} color="var(--accent-secondary)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Bespoke Matching</h3>
              <p>We analyze your child's learning style and academic goals to pair them with the perfect mentor, not just whoever is available.</p>
            </div>
            <div className="card animate-fade-up delay-2">
              <div style={{ width: '64px', height: '64px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <GraduationCap size={32} color="white" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Result Driven</h3>
              <p>From foundational building blocks to intense IIT-JEE & NEET preparation, our methodology is focused entirely on measurable outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--gradient-glow)', opacity: 0.05, zIndex: -1 }}></div>
        <div className="container">
          <div className="card text-center animate-fade-up" style={{ padding: '6rem 2rem', background: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Ready to unlock your child's potential?</h2>
            <p style={{ margin: '0 auto 3rem', maxWidth: '500px' }}>
              Experience our premium service firsthand. Get matched with an elite tutor within 24 hours. Your first session is on us.
            </p>
            <Link to="/parent-enquiry" className="btn btn-primary gap-2" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
