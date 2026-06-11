import { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  User, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  MapPin, 
  CheckCircle,
  Sun,
  Sunset,
  Moon,
  Calendar,
  Check
} from 'lucide-react';
import './ParentEnquiry.css';

// Class options data
const CLASS_OPTIONS = [
  { id: '1-5', title: 'Class 1 to 5', desc: 'Primary Foundation', icon: GraduationCap },
  { id: '6-8', title: 'Class 6 to 8', desc: 'Middle School Basics', icon: BookOpen },
  { id: '9-10', title: 'Class 9 to 10', desc: 'Board Preparation', icon: GraduationCap },
  { id: '11-12', title: 'Class 11 to 12', desc: 'Senior Secondary', icon: BookOpen },
  { id: 'iit-neet', title: 'IIT-JEE / NEET', desc: 'Entrance Coaching', icon: Star }
];

// Timing options data
const TIMING_OPTIONS = [
  { id: 'morning', title: 'Morning Slot', desc: '6:00 AM - 12:00 PM', icon: Sun },
  { id: 'afternoon', title: 'Afternoon Slot', desc: '12:00 PM - 4:00 PM', icon: Sunset },
  { id: 'evening', title: 'Evening Slot', desc: '4:00 PM - 8:00 PM', icon: Moon },
  { id: 'any', title: 'No Preference', desc: 'Any slot works', icon: Calendar }
];

// Popular subjects list
const POPULAR_SUBJECTS = [
  'Mathematics',
  'Science (Physics/Chem/Bio)',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Social Studies',
  'Other'
];

export default function ParentEnquiry() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: '',
    mobileNumber: '',
    studentClass: '',
    subjects: [],
    customSubject: '',
    preferredTiming: '',
    patnaArea: ''
  });

  const [errors, setErrors] = useState({});

  // Form Field Updates
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for that field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Toggle Subject Checkbox
  const handleSubjectToggle = (subject) => {
    const currentSubjects = [...formData.subjects];
    const index = currentSubjects.indexOf(subject);
    
    if (index > -1) {
      currentSubjects.splice(index, 1);
    } else {
      currentSubjects.push(subject);
    }

    handleChange('subjects', currentSubjects);
  };

  // Step Validations
  const validateStep = (currentStep) => {
    const stepErrors = {};

    if (currentStep === 1) {
      if (!formData.parentName.trim()) {
        stepErrors.parentName = "Please enter your full name.";
      }
      if (!formData.mobileNumber.trim()) {
        stepErrors.mobileNumber = "Please enter your mobile number.";
      } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.trim())) {
        stepErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
      }
    }

    if (currentStep === 2) {
      if (!formData.studentClass) {
        stepErrors.studentClass = "Please select the student's class.";
      }
    }

    if (currentStep === 3) {
      const hasSelectedSubjects = formData.subjects.length > 0;
      const hasCustomSubject = formData.subjects.includes('Other') && formData.customSubject.trim() !== '';
      
      if (!hasSelectedSubjects && !hasCustomSubject) {
        stepErrors.subjects = "Please select at least one subject or specify in 'Other'.";
      } else if (formData.subjects.includes('Other') && !formData.customSubject.trim()) {
        stepErrors.customSubject = "Please specify your subject requirements.";
      }
    }

    if (currentStep === 4) {
      if (!formData.preferredTiming) {
        stepErrors.preferredTiming = "Please select a preferred timing slot.";
      }
    }

    if (currentStep === 5) {
      if (!formData.patnaArea.trim()) {
        stepErrors.patnaArea = "Please specify your location in Patna.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Navigation Handlers
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(5)) {
      setStep(6);
    }
  };

  // Helper: Get checked subjects string
  const getSubjectsSummaryText = () => {
    let list = formData.subjects.filter(s => s !== 'Other');
    if (formData.subjects.includes('Other') && formData.customSubject.trim()) {
      list.push(formData.customSubject.trim());
    }
    return list.join(', ');
  };

  // Helper: Make WhatsApp link for summary
  const getWhatsAppLink = () => {
    const classLabel = CLASS_OPTIONS.find(c => c.id === formData.studentClass)?.title || formData.studentClass;
    const timingLabel = TIMING_OPTIONS.find(t => t.id === formData.preferredTiming)?.title || formData.preferredTiming;
    
    const textMsg = `Hello Diwakar Sir, I want to book a home tutor demo class. Here are my details:
    
- *Parent Name:* ${formData.parentName}
- *Contact Number:* ${formData.mobileNumber}
- *Class:* ${classLabel}
- *Subjects:* ${getSubjectsSummaryText()}
- *Preferred Timing:* ${timingLabel}
- *Patna Area/Locality:* ${formData.patnaArea}

Please contact me to arrange the demo. Thank you!`;

    return `https://wa.me/917301455882?text=${encodeURIComponent(textMsg)}`;
  };

  // Render Progress Percentage
  const progressPercent = ((step - 1) / 5) * 100;

  return (
    <section className="section section-alt" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        
        {step < 6 && (
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <div className="badge" style={{ marginBottom: '1rem' }}>
              <Star size={16} fill="var(--accent)" color="var(--accent)" /> 
              <span>Quick 2-Min Tutor Match</span>
            </div>
            <h2>Book Your Free Demo</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '1.05rem' }}>Find the perfect verified home tutor in Patna today.</p>
          </div>
        )}

        <div className="wizard-card">
          {/* Progress Indicator */}
          {step < 6 && (
            <div className="wizard-progress-container">
              <div className="wizard-progress-text">
                <span>Step {step} of 5</span>
                <span>{Math.round(progressPercent)}% Completed</span>
              </div>
              <div className="wizard-progress-bar-bg">
                <div 
                  className="wizard-progress-bar-fill" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Form container */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* STEP 1: Name and Number */}
            {step === 1 && (
              <div className="wizard-step-content">
                <h3 className="wizard-step-title">Let's get started!</h3>
                <p className="wizard-step-subtitle">Please enter your name and contact details so we can reach you.</p>
                
                <div className="form-group">
                  <label className="form-label">Parent's Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      style={{ paddingLeft: '48px' }}
                      placeholder="e.g. Rahul Sharma"
                      value={formData.parentName}
                      onChange={(e) => handleChange('parentName', e.target.value)}
                    />
                  </div>
                  {errors.parentName && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.parentName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp/Mobile Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="tel" 
                      className="form-input" 
                      required 
                      style={{ paddingLeft: '48px' }}
                      placeholder="10-digit mobile number" 
                      pattern="[0-9]{10}"
                      value={formData.mobileNumber}
                      onChange={(e) => handleChange('mobileNumber', e.target.value)}
                    />
                  </div>
                  {errors.mobileNumber && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.mobileNumber}</span>}
                </div>
              </div>
            )}

            {/* STEP 2: Class Selection */}
            {step === 2 && (
              <div className="wizard-step-content">
                <h3 className="wizard-step-title">Select Student's Class</h3>
                <p className="wizard-step-subtitle">Choose the standard or board the student is studying in.</p>
                
                <div className="wizard-grid-cards">
                  {CLASS_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = formData.studentClass === opt.id;
                    return (
                      <label 
                        key={opt.id} 
                        className={`wizard-select-card ${isSelected ? 'selected' : ''}`}
                      >
                        <input 
                          type="radio" 
                          name="studentClass" 
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => handleChange('studentClass', opt.id)}
                          className="wizard-select-card-input"
                        />
                        <div className="wizard-card-icon">
                          <IconComp size={22} />
                        </div>
                        <div className="wizard-card-details">
                          <span className="wizard-card-title">{opt.title}</span>
                          <span className="wizard-card-subtitle">{opt.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.studentClass && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>{errors.studentClass}</span>}
              </div>
            )}

            {/* STEP 3: Subjects Selection */}
            {step === 3 && (
              <div className="wizard-step-content">
                <h3 className="wizard-step-title">Select Subject requirements</h3>
                <p className="wizard-step-subtitle">Choose one or more subjects you need home tuition for.</p>
                
                <div className="wizard-checkbox-grid">
                  {POPULAR_SUBJECTS.map((subject) => {
                    const isChecked = formData.subjects.includes(subject);
                    return (
                      <label 
                        key={subject} 
                        className={`wizard-checkbox-label ${isChecked ? 'checked' : ''}`}
                      >
                        <input 
                          type="checkbox" 
                          className="wizard-checkbox-input"
                          checked={isChecked}
                          onChange={() => handleSubjectToggle(subject)}
                        />
                        <span>{subject}</span>
                      </label>
                    );
                  })}
                </div>

                {formData.subjects.includes('Other') && (
                  <div className="form-group animate-fade-up" style={{ animationDuration: '0.2s' }}>
                    <label className="form-label">Specify Subject Details</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. Physics and Math, Olympiad prep"
                      value={formData.customSubject}
                      onChange={(e) => handleChange('customSubject', e.target.value)}
                      required
                    />
                    {errors.customSubject && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.customSubject}</span>}
                  </div>
                )}
                {errors.subjects && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>{errors.subjects}</span>}
              </div>
            )}

            {/* STEP 4: Timing Selection */}
            {step === 4 && (
              <div className="wizard-step-content">
                <h3 className="wizard-step-title">Preferred Timing Slot</h3>
                <p className="wizard-step-subtitle">What is the most suitable time for the tutor to teach your child?</p>
                
                <div className="wizard-grid-cards">
                  {TIMING_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = formData.preferredTiming === opt.id;
                    return (
                      <label 
                        key={opt.id} 
                        className={`wizard-select-card ${isSelected ? 'selected' : ''}`}
                      >
                        <input 
                          type="radio" 
                          name="preferredTiming" 
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => handleChange('preferredTiming', opt.id)}
                          className="wizard-select-card-input"
                        />
                        <div className="wizard-card-icon">
                          <IconComp size={22} />
                        </div>
                        <div className="wizard-card-details">
                          <span className="wizard-card-title">{opt.title}</span>
                          <span className="wizard-card-subtitle">{opt.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.preferredTiming && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>{errors.preferredTiming}</span>}
              </div>
            )}

            {/* STEP 5: Location */}
            {step === 5 && (
              <div className="wizard-step-content">
                <h3 className="wizard-step-title">Where in Patna?</h3>
                <p className="wizard-step-subtitle">Provide your locality/area in Patna so we can find a nearby tutor.</p>
                
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Locality / Area Name</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      style={{ paddingLeft: '48px' }}
                      placeholder="e.g. Kankarbagh, Boring Road, Kadamkuan"
                      value={formData.patnaArea}
                      onChange={(e) => handleChange('patnaArea', e.target.value)}
                    />
                  </div>
                  {errors.patnaArea && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.patnaArea}</span>}
                </div>
              </div>
            )}

            {/* STEP 6: Success Receipt */}
            {step === 6 && (
              <div className="wizard-step-content text-center animate-fade-up">
                <div className="success-checkmark-wrapper">
                  <CheckCircle size={36} fill="#10b981" color="white" />
                </div>
                
                <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>Request Received Successfully!</h3>
                <p style={{ color: '#047857', fontSize: '0.95rem' }}>
                  Aapki requirements hamare system me save ho gayi hain. Diwakar Sir jald hi call arrange karenge.
                </p>

                <div className="receipt-container">
                  <div className="receipt-header">
                    <span>Demo booking ticket</span>
                    <span className="receipt-badge">Pending Match</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Parent Name</span>
                    <span className="receipt-value">{formData.parentName}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Contact No.</span>
                    <span className="receipt-value">+91 {formData.mobileNumber}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Student Class</span>
                    <span className="receipt-value">
                      {CLASS_OPTIONS.find(c => c.id === formData.studentClass)?.title || formData.studentClass}
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Subjects</span>
                    <span className="receipt-value">{getSubjectsSummaryText()}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Timing</span>
                    <span className="receipt-value">
                      {TIMING_OPTIONS.find(t => t.id === formData.preferredTiming)?.title || formData.preferredTiming}
                    </span>
                  </div>

                  <div className="receipt-row" style={{ marginBottom: 0 }}>
                    <span className="receipt-label">Patna Area</span>
                    <span className="receipt-value">{formData.patnaArea}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary gap-2"
                    style={{ background: '#25d366', color: 'white', border: 'none', width: '100%', fontSize: '1.05rem', padding: '1rem' }}
                  >
                    {/* Inline WhatsApp SVG */}
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.171 3.466L6.71 18.067l2.748-.72c.924.593 2.014.946 3.185.947h.003c3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.58-5.766-5.768-5.766zm3.411 8.21c-.14.394-.716.718-1.07.766-.307.042-.705.074-2.146-.522-1.843-.761-3.033-2.633-3.125-2.756-.092-.123-.815-.972-.815-1.854s.46-.131.624-.3c.164-.168.358-.21.478-.21.12 0 .239.001.343.006.111.005.257-.043.404.312.164.394.562 1.371.611 1.47.05.099.082.214.016.345-.065.13-.1.282-.198.396-.098.115-.216.25-.308.344-.102.103-.21.214-.09.421.12.206.533.88 1.144 1.425.787.701 1.447.918 1.653 1.02.206.103.327.087.45-.054.123-.14.522-.607.662-.813.14-.206.281-.172.472-.102.191.07.121.05.772.375.65.326 1.083.488 1.165.627.083.14.083.41-.057.804zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <span>Connect on WhatsApp Instantly</span>
                  </a>

                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => {
                      setFormData({
                        parentName: '',
                        mobileNumber: '',
                        studentClass: '',
                        subjects: [],
                        customSubject: '',
                        preferredTiming: '',
                        patnaArea: ''
                      });
                      setStep(1);
                    }}
                    style={{ width: '100%' }}
                  >
                    Book Another Demo
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons inside card */}
            {step < 6 && (
              <div className="wizard-footer">
                {step > 1 ? (
                  <button 
                    type="button" 
                    className="btn btn-outline gap-2" 
                    onClick={handleBack}
                  >
                    <ArrowLeft size={16} /> <span>Back</span>
                  </button>
                ) : (
                  <div className="wizard-footer-btn-placeholder"></div>
                )}

                {step < 5 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary gap-2" 
                    onClick={handleNext}
                  >
                    <span>Next</span> <ArrowRight size={16} />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-primary gap-2"
                  >
                    <span>Submit Request</span> <CheckCircle size={16} />
                  </button>
                )}
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
