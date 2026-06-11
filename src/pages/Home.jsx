import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, ArrowRight, Star, Quote, ChevronDown } from 'lucide-react';
import heroImage from '../assets/hero-image.png';

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Hero Section */}
      <section className="section hero-section">
        <div className="container hero-grid">
          
          <div className="hero-content">
            <div className="badge animate-fade-up">
              <Star size={16} fill="var(--accent)" color="var(--accent)" className="animate-pulse-fast" /> 
              <span>Rated 5.0 by 1,000+ Parents in Patna</span>
            </div>
            
            <h1 className="animate-fade-up delay-1">
              Find the Perfect <br/>
              <span style={{ color: 'var(--primary)' }}>Home Tutor</span><br/> for Your Child.
            </h1>
            
            <p className="animate-fade-up delay-2 hero-subtitle">
              Expert personalized 1-on-1 education. From Class 1 to 12, IIT-JEE, and NEET — we bring top-tier, verified educators directly to your doorstep in Patna.
            </p>
            
            <div className="hero-buttons animate-fade-up delay-3">
              <Link to="/parent-enquiry" className="btn btn-primary gap-2">
                Book Free Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div className="hero-image-wrapper animate-slide-in-right delay-2">
             <img 
               src={heroImage} 
               alt="Tutor teaching a student at home in Patna" 
               className="hero-image animate-float" 
             />
             <div className="trust-card animate-float">
                <div className="trust-icon">
                  <ShieldCheck color="#10b981" size={24} />
                </div>
                <div>
                  <div className="trust-title">100% Safe</div>
                  <div className="trust-subtitle">Verified Educators</div>
                </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center stats-grid">
            <div className="animate-fade-up">
              <div className="stat-number">1,000+</div>
              <div className="stat-label">Happy Students</div>
            </div>
            <div className="animate-fade-up delay-1">
              <div className="stat-number">700+</div>
              <div className="stat-label">Verified Tutors</div>
            </div>
            <div className="animate-fade-up delay-2">
              <div className="stat-number">100%</div>
              <div className="stat-label">Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Features */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="text-center animate-fade-up section-header">
            <h2>Why Parents Choose Diwakar Sir Home Tutors</h2>
            <p className="section-subtitle">
              We provide a structured, safe, and highly effective learning environment for your child in Patna.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 features-grid">
            <div className="card animate-fade-up">
              <div className="feature-icon">
                <ShieldCheck size={28} />
              </div>
              <h3>100% Verified Tutors</h3>
              <p>Every home tutor in Patna undergoes a strict background check, identity verification, and subject proficiency test before they teach.</p>
            </div>
            <div className="card animate-fade-up delay-1">
              <div className="feature-icon">
                <Users size={28} />
              </div>
              <h3>Personalized Learning</h3>
              <p>No more crowded batches. We focus entirely on your child's individual pace, strengths, and areas of improvement.</p>
            </div>
            <div className="card animate-fade-up delay-2">
              <div className="feature-icon">
                <GraduationCap size={28} />
              </div>
              <h3>Expert Coaching</h3>
              <p>Specialized educators available for board exams, foundational years, and highly competitive exams like IIT-JEE, NEET, and UPSC BPSC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials">
        <div className="container">
           <div className="text-center animate-fade-up section-header">
            <h2>What Parents & Students Say</h2>
            <p className="section-subtitle">Real reviews from our community in Patna.</p>
          </div>
          <div className="grid grid-cols-3 gap-8 testimonials-grid">
             <div className="card animate-fade-up">
               <Quote size={32} color="var(--border)" style={{ marginBottom: '1rem' }} />
               <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"Finding the best home tutor in Patna was easy with Diwakar Sir. My daughter's scores in Math improved significantly thanks to their personalized home tuition."</p>
               <div style={{ fontWeight: 600, color: 'var(--secondary)' }}>— Mr. Amit Sharma</div>
               <div style={{ fontSize: '0.875rem', color: 'var(--text)' }}>Parent</div>
             </div>
             <div className="card animate-fade-up delay-1">
               <Quote size={32} color="var(--border)" style={{ marginBottom: '1rem' }} />
               <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"We were looking for home tuition in Patna for our son's 10th grade. The qualified home tutor they sent is excellent and very professional."</p>
               <div style={{ fontWeight: 600, color: 'var(--secondary)' }}>— Mrs. Priyanka Kumari</div>
               <div style={{ fontSize: '0.875rem', color: 'var(--text)' }}>Parent</div>
             </div>
             <div className="card animate-fade-up delay-2">
               <Quote size={32} color="var(--border)" style={{ marginBottom: '1rem' }} />
               <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"The tuition classes Patna offered here for Class 12 Physics helped me clear my concepts. Best decision for academic support!"</p>
               <div style={{ fontWeight: 600, color: 'var(--secondary)' }}>— Vikash Raj</div>
               <div style={{ fontSize: '0.875rem', color: 'var(--text)' }}>Student</div>
             </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section / FAQ */}
      <section className="section section-alt">
        <div className="container">
           <div className="text-center animate-fade-up section-header">
            <h2>Classes & Subjects We Cover</h2>
            <p className="section-subtitle">Comprehensive home tuition across Patna for all academic needs.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 content-grid animate-fade-up">
             <div>
                <h3 style={{ marginBottom: '1rem' }}>Primary & Middle School (Class 1 to 8)</h3>
                <p style={{ marginBottom: '1.5rem' }}>Build a strong foundation for your child with our patient and experienced tutors. We cover all major subjects including Mathematics, Science, English, and Social Studies, ensuring concepts are crystal clear from the start.</p>
                <h3 style={{ marginBottom: '1rem' }}>High School & Senior Secondary (Class 9 to 12)</h3>
                <p>Expert subject-specific teachers for CBSE, ICSE, and State Boards. Get dedicated home tutors in Patna for Physics, Chemistry, Biology, Mathematics, Commerce, and Humanities.</p>
             </div>
             <div>
                <h3 style={{ marginBottom: '1rem' }}>Competitive Exams (IIT-JEE & NEET)</h3>
                <p style={{ marginBottom: '1.5rem' }}>Preparing for engineering or medical entrances requires rigorous training. We provide elite faculty who have a proven track record of guiding students to top ranks in IIT-JEE and NEET right from the comfort of their home.</p>
                <h3 style={{ marginBottom: '1rem' }}>General Competition (UPSC, BPSC, SSC)</h3>
                <p>Looking for private coaching for government exams? We have experienced educators in Patna who provide targeted guidance for UPSC, BPSC, SSC, and Banking exams.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center cta-card animate-fade-up">
            <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Give your child the academic edge.</h2>
            <p style={{ margin: '0 auto 2.5rem', maxWidth: '600px', color: '#e2e8f0', fontSize: '1.125rem' }}>
              Get matched with the perfect tutor within 24 hours. Enjoy a free demo class before making any commitments. Available across all major locations in Patna including Kankarbagh, Boring Road, and Rajendra Nagar.
            </p>
            <Link to="/parent-enquiry" className="btn btn-primary gap-2 btn-large">
              Book Free Demo Now <ArrowRight size={20} className="animate-pulse-fast" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
