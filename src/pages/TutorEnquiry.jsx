import { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  MapPin, 
  CheckCircle,
  Sun,
  Sunset,
  Moon,
  Calendar,
  Star,
  Award,
  User,
  Phone,
  Briefcase
} from 'lucide-react';
import './TutorEnquiry.css';

// Qualification options
const QUALIFICATION_OPTIONS = [
  { id: 'btech', title: 'B.Tech / B.E.', desc: 'Engineering background', icon: GraduationCap },
  { id: 'msc-bsc', title: 'M.Sc / B.Sc', desc: 'Science graduate', icon: BookOpen },
  { id: 'bed', title: 'B.Ed / D.El.Ed', desc: 'Professional teaching degree', icon: Award },
  { id: 'other', title: 'Other Degrees', desc: 'Arts/Commerce/Others', icon: Star }
];

// Timing options
const TIMING_OPTIONS = [
  { id: 'morning', title: 'Morning Slot', desc: '6:00 AM - 12:00 PM', icon: Sun },
  { id: 'afternoon', title: 'Afternoon Slot', desc: '12:00 PM - 4:00 PM', icon: Sunset },
  { id: 'evening', title: 'Evening Slot', desc: '4:00 PM - 8:00 PM', icon: Moon },
  { id: 'any', title: 'No Preference', desc: 'Any slot works', icon: Calendar }
];

// Popular subjects
const SUBJECTS_LIST = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Social Studies',
  'Computer Science',
  'Other'
];

// Classes list
const CLASSES_LIST = [
  'Class 1 to 5',
  'Class 6 to 8',
  'Class 9 to 10',
  'Class 11 to 12',
  'IIT-JEE / NEET'
];

export default function TutorEnquiry() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tutorName: '',
    mobileNumber: '',
    qualification: '',
    customQualification: '',
    experience: '',
    subjects: [],
    customSubject: '',
    classes: [],
    preferredTiming: '',
    patnaAreas: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_TUTOR_URL || '';

  // Form Field Updates
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Toggle Checkboxes
  const handleToggle = (field, item) => {
    const list = [...formData[field]];
    const index = list.indexOf(item);
    
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(item);
    }

    handleChange(field, list);
  };

  // Step validations
  const validateStep = (currentStep) => {
    const stepErrors = {};

    if (currentStep === 1) {
      if (!formData.tutorName.trim()) {
        stepErrors.tutorName = "Please enter your full name.";
      }
      if (!formData.mobileNumber.trim()) {
        stepErrors.mobileNumber = "Please enter your mobile number.";
      } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.trim())) {
        stepErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
      }
    }

    if (currentStep === 2) {
      if (!formData.qualification) {
        stepErrors.qualification = "Please select your highest qualification.";
      } else if (formData.qualification === 'other' && !formData.customQualification.trim()) {
        stepErrors.customQualification = "Please specify your degree name.";
      }
      if (formData.experience === '') {
        stepErrors.experience = "Please specify your years of teaching experience.";
      } else if (parseInt(formData.experience) < 0) {
        stepErrors.experience = "Experience cannot be negative.";
      }
    }

    if (currentStep === 3) {
      const hasSubjects = formData.subjects.length > 0;
      const hasCustomSub = formData.subjects.includes('Other') && formData.customSubject.trim() !== '';
      
      if (!hasSubjects && !hasCustomSub) {
        stepErrors.subjects = "Please select at least one subject you can teach.";
      } else if (formData.subjects.includes('Other') && !formData.customSubject.trim()) {
        stepErrors.customSubject = "Please specify your subjects.";
      }

      if (formData.classes.length === 0) {
        stepErrors.classes = "Please select at least one class standard you can teach.";
      }
    }

    if (currentStep === 4) {
      if (!formData.preferredTiming) {
        stepErrors.preferredTiming = "Please select your preferred teaching timing.";
      }
    }

    if (currentStep === 5) {
      if (!formData.patnaAreas.trim()) {
        stepErrors.patnaAreas = "Please specify the areas in Patna you can cover.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(5)) {
      setIsSubmitting(true);
      
      const qualLabel = QUALIFICATION_OPTIONS.find(q => q.id === formData.qualification)?.title || formData.qualification;
      const finalQual = formData.qualification === 'other' ? formData.customQualification : qualLabel;
      const timingLabel = TIMING_OPTIONS.find(t => t.id === formData.preferredTiming)?.title || formData.preferredTiming;

      // Format subjects list
      let subjectsList = formData.subjects.filter(s => s !== 'Other');
      if (formData.subjects.includes('Other') && formData.customSubject.trim()) {
        subjectsList.push(formData.customSubject.trim());
      }

      const payload = {
        tutorName: formData.tutorName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        qualification: finalQual.trim(),
        experience: `${formData.experience} Years`,
        subjects: subjectsList.join(', '),
        classes: formData.classes.join(', '),
        preferredTiming: timingLabel,
        patnaAreas: formData.patnaAreas.trim()
      };

      if (googleSheetUrl) {
        try {
          await fetch(googleSheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.error('Failed to submit tutor application to Google Sheets:', err);
        }
      }
      
      setIsSubmitting(false);
      setStep(6);
    }
  };

  // Format subjects taught summary
  const getSubjectsSummary = () => {
    let list = formData.subjects.filter(s => s !== 'Other');
    if (formData.subjects.includes('Other') && formData.customSubject.trim()) {
      list.push(formData.customSubject.trim());
    }
    return list.join(', ');
  };

  // Generate WhatsApp message
  const getWhatsAppLink = () => {
    const qualLabel = QUALIFICATION_OPTIONS.find(q => q.id === formData.qualification)?.title || formData.qualification;
    const finalQual = formData.qualification === 'other' ? formData.customQualification : qualLabel;
    const timingLabel = TIMING_OPTIONS.find(t => t.id === formData.preferredTiming)?.title || formData.preferredTiming;

    const textMsg = `Hello Diwakar Sir, I want to register as a Home Tutor with your agency. Here are my application details:
    
- *Tutor Name:* ${formData.tutorName}
- *Contact Number:* ${formData.mobileNumber}
- *Qualification:* ${finalQual}
- *Experience:* ${formData.experience} Years
- *Subjects I Teach:* ${getSubjectsSummary()}
- *Classes I Can Teach:* ${formData.classes.join(', ')}
- *Preferred Teaching Timings:* ${timingLabel}
- *Patna Localities Covered:* ${formData.patnaAreas}

Please review my details and schedule an onboarding call. Thank you!`;

    return `https://wa.me/917301455882?text=${encodeURIComponent(textMsg)}`;
  };

  const progressPercent = ((step - 1) / 5) * 100;

  return (
    <section className="section section-alt" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        
        {step < 6 && (
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <div className="badge animate-fade-up" style={{ marginBottom: '1rem', color: '#4f46e5', borderColor: '#e0e7ff', background: '#f5f3ff' }}>
              <GraduationCap size={16} /> 
              <span>Tutor Application</span>
            </div>
            <h2>Join as a Home Tutor</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '1.05rem' }}>Teach students in Patna, set your own schedule, and earn well.</p>
          </div>
        )}

        <div className="tutor-wizard-card">
          {/* Progress Indicator */}
          {step < 6 && (
            <div className="tutor-progress-container">
              <div className="tutor-progress-text">
                <span>Step {step} of 5</span>
                <span>{Math.round(progressPercent)}% Completed</span>
              </div>
              <div className="tutor-progress-bar-bg">
                <div 
                  className="tutor-progress-bar-fill" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* STEP 1: Personal Contact */}
            {step === 1 && (
              <div className="tutor-step-content">
                <h3 className="tutor-step-title">Welcome Educator!</h3>
                <p className="tutor-step-subtitle">Let's get started with your name and mobile number.</p>
                
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      style={{ paddingLeft: '48px' }}
                      placeholder="e.g. Anand Kumar"
                      value={formData.tutorName}
                      onChange={(e) => handleChange('tutorName', e.target.value)}
                    />
                  </div>
                  {errors.tutorName && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.tutorName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number (WhatsApp Preferred)</label>
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

            {/* STEP 2: Qualification and Experience */}
            {step === 2 && (
              <div className="tutor-step-content">
                <h3 className="tutor-step-title">Academic & Experience Details</h3>
                <p className="tutor-step-subtitle">Select your highest academic qualification and teaching background.</p>
                
                <div className="tutor-grid-cards">
                  {QUALIFICATION_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = formData.qualification === opt.id;
                    return (
                      <label 
                        key={opt.id} 
                        className={`tutor-select-card ${isSelected ? 'selected' : ''}`}
                      >
                        <input 
                          type="radio" 
                          name="qualification" 
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => handleChange('qualification', opt.id)}
                          className="tutor-select-card-input"
                        />
                        <div className="tutor-card-icon">
                          <IconComp size={22} />
                        </div>
                        <div className="tutor-card-details">
                          <span className="tutor-card-title">{opt.title}</span>
                          <span className="tutor-card-subtitle">{opt.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {formData.qualification === 'other' && (
                  <div className="form-group animate-fade-up" style={{ animationDuration: '0.2s' }}>
                    <label className="form-label">Specify Degree / Qualification</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. M.Com, MCA, Ph.D"
                      value={formData.customQualification}
                      onChange={(e) => handleChange('customQualification', e.target.value)}
                    />
                    {errors.customQualification && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.customQualification}</span>}
                  </div>
                )}
                {errors.qualification && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>{errors.qualification}</span>}

                <div className="form-group">
                  <label className="form-label">Years of Teaching Experience</label>
                  <div style={{ position: 'relative' }}>
                    <Briefcase size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="number" 
                      className="form-input" 
                      required 
                      style={{ paddingLeft: '48px' }}
                      placeholder="e.g. 2" 
                      min="0"
                      value={formData.experience}
                      onChange={(e) => handleChange('experience', e.target.value)}
                    />
                  </div>
                  {errors.experience && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.experience}</span>}
                </div>
              </div>
            )}

            {/* STEP 3: Subjects & Classes Selection */}
            {step === 3 && (
              <div className="tutor-step-content">
                <h3 className="tutor-step-title">Teaching Preferences</h3>
                <p className="tutor-step-subtitle">What subjects and classes are you comfortable teaching?</p>
                
                <label className="form-label" style={{ marginBottom: '0.75rem' }}>Subjects You Teach (Select all that apply)</label>
                <div className="tutor-checkbox-grid">
                  {SUBJECTS_LIST.map((subject) => {
                    const isChecked = formData.subjects.includes(subject);
                    return (
                      <label 
                        key={subject} 
                        className={`tutor-checkbox-label ${isChecked ? 'checked' : ''}`}
                      >
                        <input 
                          type="checkbox" 
                          className="tutor-checkbox-input"
                          checked={isChecked}
                          onChange={() => handleToggle('subjects', subject)}
                        />
                        <span>{subject}</span>
                      </label>
                    );
                  })}
                </div>

                {formData.subjects.includes('Other') && (
                  <div className="form-group animate-fade-up" style={{ animationDuration: '0.2s', marginBottom: '1.5rem' }}>
                    <label className="form-label">Specify Custom Subjects</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. French, Sanskrit, Coding, UPSC GS"
                      value={formData.customSubject}
                      onChange={(e) => handleChange('customSubject', e.target.value)}
                      required
                    />
                    {errors.customSubject && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.customSubject}</span>}
                  </div>
                )}
                {errors.subjects && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '1.5rem' }}>{errors.subjects}</span>}

                <label className="form-label" style={{ marginBottom: '0.75rem' }}>Target Classes (Select all that apply)</label>
                <div className="tutor-checkbox-grid">
                  {CLASSES_LIST.map((c) => {
                    const isChecked = formData.classes.includes(c);
                    return (
                      <label 
                        key={c} 
                        className={`tutor-checkbox-label ${isChecked ? 'checked' : ''}`}
                      >
                        <input 
                          type="checkbox" 
                          className="tutor-checkbox-input"
                          checked={isChecked}
                          onChange={() => handleToggle('classes', c)}
                        />
                        <span>{c}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.classes && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>{errors.classes}</span>}
              </div>
            )}

            {/* STEP 4: Timings availability */}
            {step === 4 && (
              <div className="tutor-step-content">
                <h3 className="tutor-step-title">Availability Timings</h3>
                <p className="tutor-step-subtitle">Select your preferred timing slot to take home tuition classes.</p>
                
                <div className="tutor-grid-cards">
                  {TIMING_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = formData.preferredTiming === opt.id;
                    return (
                      <label 
                        key={opt.id} 
                        className={`tutor-select-card ${isSelected ? 'selected' : ''}`}
                      >
                        <input 
                          type="radio" 
                          name="preferredTiming" 
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => handleChange('preferredTiming', opt.id)}
                          className="tutor-select-card-input"
                        />
                        <div className="tutor-card-icon">
                          <IconComp size={22} />
                        </div>
                        <div className="tutor-card-details">
                          <span className="tutor-card-title">{opt.title}</span>
                          <span className="tutor-card-subtitle">{opt.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.preferredTiming && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>{errors.preferredTiming}</span>}
              </div>
            )}

            {/* STEP 5: Travel areas */}
            {step === 5 && (
              <div className="tutor-step-content">
                <h3 className="tutor-step-title">Areas Covered in Patna</h3>
                <p className="tutor-step-subtitle">Which localities or areas in Patna can you easily travel to for teaching?</p>
                
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Locality / Local Areas</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      style={{ paddingLeft: '48px' }}
                      placeholder="e.g. Kankarbagh, Boring Road, Rajendra Nagar, Bailey Road"
                      value={formData.patnaAreas}
                      onChange={(e) => handleChange('patnaAreas', e.target.value)}
                    />
                  </div>
                  {errors.patnaAreas && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.patnaAreas}</span>}
                </div>
              </div>
            )}

            {/* STEP 6: Confirmation & WhatsApp */}
            {step === 6 && (
              <div className="tutor-step-content text-center animate-fade-up">
                <div className="tutor-success-checkmark-wrapper">
                  <CheckCircle size={36} fill="#10b981" color="white" />
                </div>
                
                <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>Application Submitted!</h3>
                <p style={{ color: '#047857', fontSize: '0.95rem' }}>
                  Aapki profiles details hamare databases me submit ho gayi hain. Hamari onboarding team jald call karegi.
                </p>

                <div className="tutor-receipt-container">
                  <div className="tutor-receipt-header">
                    <span>Tutor application receipt</span>
                    <span className="tutor-receipt-badge">Pending Review</span>
                  </div>

                  <div className="tutor-receipt-row">
                    <span className="tutor-receipt-label">Tutor Name</span>
                    <span className="tutor-receipt-value">{formData.tutorName}</span>
                  </div>

                  <div className="tutor-receipt-row">
                    <span className="tutor-receipt-label">Contact Info</span>
                    <span className="tutor-receipt-value">+91 {formData.mobileNumber}</span>
                  </div>

                  <div className="tutor-receipt-row">
                    <span className="tutor-receipt-label">Degree</span>
                    <span className="tutor-receipt-value">
                      {QUALIFICATION_OPTIONS.find(q => q.id === formData.qualification)?.title || formData.qualification === 'other' ? formData.customQualification : formData.qualification}
                    </span>
                  </div>

                  <div className="tutor-receipt-row">
                    <span className="tutor-receipt-label">Experience</span>
                    <span className="tutor-receipt-value">{formData.experience} Years</span>
                  </div>

                  <div className="tutor-receipt-row">
                    <span className="tutor-receipt-label">Subjects</span>
                    <span className="tutor-receipt-value">{getSubjectsSummary()}</span>
                  </div>

                  <div className="tutor-receipt-row">
                    <span className="tutor-receipt-label">Classes</span>
                    <span className="tutor-receipt-value">{formData.classes.join(', ')}</span>
                  </div>

                  <div className="tutor-receipt-row" style={{ marginBottom: 0 }}>
                    <span className="tutor-receipt-label">Patna Localities</span>
                    <span className="tutor-receipt-value">{formData.patnaAreas}</span>
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
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.171 3.466L6.71 18.067l2.748-.72c.924.593 2.014.946 3.185.947h.003c3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.58-5.766-5.768-5.766zm3.411 8.21c-.14.394-.716.718-1.07.766-.307.042-.705.074-2.146-.522-1.843-.761-3.033-2.633-3.125-2.756-.092-.123-.815-.972-.815-1.854s.46-.131.624-.3c.164-.168.358-.21.478-.21.12 0 .239.001.343.006.111.005.257-.043.404.312.164.394.562 1.371.611 1.47.05.099.082.214.016.345-.065.13-.1.282-.198.396-.098.115-.216.25-.308.344-.102.103-.21.214-.09.421.12.206.533.88 1.144 1.425.787.701 1.447.918 1.653 1.02.206.103.327.087.45-.054.123-.14.522-.607.662-.813.14-.206.281-.172.472-.102.191.07.121.05.772.375.65.326 1.083.488 1.165.627.083.14.083.41-.057.804zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <span>Send Application to WhatsApp Instantly</span>
                  </a>

                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => {
                      setFormData({
                        tutorName: '',
                        mobileNumber: '',
                        qualification: '',
                        customQualification: '',
                        experience: '',
                        subjects: [],
                        customSubject: '',
                        classes: [],
                        preferredTiming: '',
                        patnaAreas: ''
                      });
                      setStep(1);
                    }}
                    style={{ width: '100%' }}
                  >
                    Submit New Application
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons inside card */}
            {step < 6 && (
              <div className="tutor-footer">
                {step > 1 ? (
                  <button 
                    type="button" 
                    className="btn btn-outline gap-2" 
                    onClick={handleBack}
                  >
                    <ArrowLeft size={16} /> <span>Back</span>
                  </button>
                ) : (
                  <div className="tutor-footer-btn-placeholder"></div>
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
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span> <CheckCircle size={16} />
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
