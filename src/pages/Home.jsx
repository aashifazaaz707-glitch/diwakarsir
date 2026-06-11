import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight, Star } from 'lucide-react';
import heroImage from '../assets/hero-image.png';

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Decorative Blobs */}
      <div className="blob" style={{ top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'rgba(37, 99, 235, 0.2)', animationDelay: '0s' }}></div>
      <div className="blob" style={{ top: '20%', left: '-10%', width: '400px', height: '400px', background: 'rgba(245, 158, 11, 0.15)', animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '120px', position: 'relative' }}>
        <div className="container grid grid-cols-2 gap-8 items-center" style={{ gridTemplateColumns: '1fr 1fr' }}>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div className="badge animate-fade-up" style={{ marginBottom: '2rem' }}>
              <Star size={16} fill="var(--accent)" color="var(--accent)" className="animate-pulse" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} /> 
              <span>Rated 5.0 by 1,000+ Parents in Patna</span>
            </div>
            
            <h1 className="animate-fade-up delay-1" style={{ marginBottom: '1.5rem' }}>
              Find the Perfect <br/>
              <span style={{ color: 'var(--primary)' }}>Home Tutor</span><br/> for Your Child.
            </h1>
            
            <p className="animate-fade-up delay-2" style={{ maxWidth: '550px', marginBottom: '3rem', fontSize: '1.25rem', color: 'var(--text)' }}>
              Personalized 1-on-1 education by verified experts. From Class 1 to 12, IIT-JEE, and NEET — we bring top-tier learning directly to your doorstep.
            </p>
            
            <div className="flex items-center gap-4 flex-wrap animate-fade-up delay-3">
              <Link to="/parent-enquiry" className="btn btn-primary gap-2" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
                Book Free Demo <ArrowRight size={20} />
              </Link>
              <Link to="/tutor-enquiry" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
                Apply as Tutor
              </Link>
            </div>
          </div>
          
          <div className="animate-slide-in-right delay-2" style={{ position: 'relative' }}>
             <img 
               src={heroImage} 
               alt="Tutor teaching a student" 
               className="animate-float" 
               style={{ width: '100%', height: 'auto', dropShadow: 'var(--shadow-xl)', borderRadius: 'var(--radius-lg)' }} 
             />
             <div className="card animate-float" style={{ position: 'absolute', bottom: '10%', left: '-10%', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '1s' }}>
                <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '50%' }}>
                  <ShieldCheck color="#10b981" size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--secondary)' }}>100% Safe</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text)' }}>Verified Educators</div>
                </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="animate-fade-up">
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)' }}>1,000+</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Happy Students</div>
            </div>
            <div className="animate-fade-up delay-1">
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)' }}>700+</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Verified Tutors</div>
            </div>
            <div className="animate-fade-up delay-2">
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)' }}>100%</div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Safety & Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="text-center animate-fade-up" style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Why Parents Choose Us</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
              We provide a structured, safe, and highly effective learning environment for your child.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="card animate-fade-up" style={{ transitionDelay: '0.1s' }}>
              <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>100% Verified Tutors</h3>
              <p>Every tutor undergoes a strict background check, identity verification, and subject proficiency test before they teach.</p>
            </div>
            <div className="card animate-fade-up" style={{ transitionDelay: '0.2s' }}>
              <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Personalized Learning</h3>
              <p>No more crowded batches. We focus entirely on your child's individual pace, strengths, and areas of improvement.</p>
            </div>
            <div className="card animate-fade-up" style={{ transitionDelay: '0.3s' }}>
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
          <div className="card text-center animate-fade-up" style={{ padding: '5rem 2rem', background: 'var(--secondary)', color: 'white', border: 'none', position: 'relative', overflow: 'hidden' }}>
            <div className="blob" style={{ top: '-50%', left: '-20%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Give your child the academic edge.</h2>
              <p style={{ margin: '0 auto 2.5rem', maxWidth: '500px', color: '#94a3b8', fontSize: '1.125rem' }}>
                Get matched with the perfect tutor within 24 hours. Enjoy a free demo class before making any commitments.
              </p>
              <Link to="/parent-enquiry" className="btn btn-primary gap-2" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                Book Free Demo <ArrowRight size={20} className="animate-pulse" style={{ animation: 'pulse 2s infinite' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
