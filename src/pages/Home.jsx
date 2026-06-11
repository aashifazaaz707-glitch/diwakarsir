import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '120px', background: 'linear-gradient(180deg, var(--bg-alt) 0%, white 100%)' }}>
        <div className="container text-center">
          <div className="badge" style={{ marginBottom: '2rem' }}>
            <Star size={16} fill="var(--accent)" color="var(--accent)" /> 
            <span>Rated 5.0 by 1,000+ Parents in Patna</span>
          </div>
          
          <h1 style={{ marginBottom: '1.5rem' }}>
            Find the Perfect <span style={{ color: 'var(--primary)' }}>Home Tutor</span><br/> for Your Child.
          </h1>
          
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.25rem', color: 'var(--text)' }}>
            Personalized 1-on-1 education by verified experts. From Class 1 to 12, IIT-JEE, and NEET — we bring top-tier learning directly to your doorstep.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/parent-enquiry" className="btn btn-primary gap-2" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
              Book Free Demo <ArrowRight size={20} />
            </Link>
            <Link to="/tutor-enquiry" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
              Apply as Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)' }}>1,000+</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Happy Students</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)' }}>700+</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Verified Tutors</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)' }}>100%</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Safety & Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Why Parents Choose Us</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
              We provide a structured, safe, and highly effective learning environment for your child.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="card">
              <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>100% Verified Tutors</h3>
              <p>Every tutor undergoes a strict background check, identity verification, and subject proficiency test before they teach.</p>
            </div>
            <div className="card">
              <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Personalized Learning</h3>
              <p>No more crowded batches. We focus entirely on your child's individual pace, strengths, and areas of improvement.</p>
            </div>
            <div className="card">
              <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <GraduationCap size={28} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Expert Coaching</h3>
              <p>Specialized educators available for board exams, foundational years, and highly competitive exams like IIT-JEE and NEET.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center" style={{ padding: '5rem 2rem', background: 'var(--secondary)', color: 'white', border: 'none' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Give your child the academic edge.</h2>
            <p style={{ margin: '0 auto 2.5rem', maxWidth: '500px', color: '#94a3b8', fontSize: '1.125rem' }}>
              Get matched with the perfect tutor within 24 hours. Enjoy a free demo class before making any commitments.
            </p>
            <Link to="/parent-enquiry" className="btn btn-primary gap-2" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
              Book Free Demo <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
