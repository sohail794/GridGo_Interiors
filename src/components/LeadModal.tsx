import { useState } from 'react';
import { X, CheckCircle, Upload, Trash2 } from 'lucide-react';
import Button3D from './Button3D';
import GlassCard from './GlassCard';
import { submitContactForm } from '../lib/supabase';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectTypes: [] as string[],
    scope: '',
    budget: '',
    timeline: '',
    details: '',
    images: [] as File[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleProjectType = (type: string) => {
    const types = formData.projectTypes.includes(type)
      ? formData.projectTypes.filter((t) => t !== type)
      : [...formData.projectTypes, type];
    handleInputChange('projectTypes', types);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3 - formData.images.length);
    handleInputChange('images', [...formData.images, ...files]);
  };

  const removeImage = (index: number) => {
    const images = formData.images.filter((_, i) => i !== index);
    handleInputChange('images', images);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `City: ${formData.city}\nProject Types: ${formData.projectTypes.join(', ')}\nScope: ${formData.scope}\nTimeline: ${formData.timeline}\nDetails: ${formData.details}`,
        form_type: 'service_quote',
        service: formData.projectTypes.join(', '),
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { id: 'residential', label: 'Residential', icon: '🏠' },
    { id: 'commercial', label: 'Commercial', icon: '🏢' },
    { id: 'hospitality', label: 'Hospitality', icon: '🏨' },
    { id: 'retail', label: 'Retail', icon: '🏪' },
  ];

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <GlassCard className="relative z-10 max-w-lg w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#00ff88]/10 flex items-center justify-center animate-pulse-glow">
            <CheckCircle size={48} className="text-[#00ff88]" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">Request Submitted Successfully!</h2>
          <p className="text-[#b4b4b4]">
            We'll contact you within 24 hours. A confirmation email has been sent to {formData.email}
          </p>
          <Button3D className="w-full" onClick={onClose}>
            Close
          </Button3D>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl my-8">
        <GlassCard className="relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-white/10 hover:border-[#ff6b35] text-white hover:text-[#ff6b35] transition-all flex items-center justify-center"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">Start Your Project</h2>
            <p className="text-[#b4b4b4]">Tell us about your vision and we'll bring it to life</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    ${s === step ? 'bg-gradient-to-br from-[#00ff88] to-[#00b894] text-[#0a0e27]' : ''}
                    ${s < step ? 'bg-[#00ff88]/20 text-[#00ff88]' : ''}
                    ${s > step ? 'border-2 border-white/10 text-[#6b7280]' : ''}
                  `}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-20 mx-2 ${
                      s < step ? 'bg-[#00ff88]' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                  placeholder="Your city"
                  required
                />
              </div>

              <Button3D
                className="w-full mt-6"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.phone || !formData.email || !formData.city}
              >
                Next: Project Details →
              </Button3D>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-4 text-[#b4b4b4]">
                  Project Type * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleProjectType(type.id)}
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${
                          formData.projectTypes.includes(type.id)
                            ? 'border-[#00ff88] bg-[#00ff88]/5'
                            : 'border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium text-white">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">Scope *</label>
                  <select
                    value={formData.scope}
                    onChange={(e) => handleInputChange('scope', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                  >
                    <option value="">Select scope</option>
                    <option value="design">Design Only</option>
                    <option value="fabrication">Design + Fabrication</option>
                    <option value="turnkey">Full Turnkey</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-3">1-3 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6-12">6-12 months</option>
                    <option value="exploring">Exploring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                  Project Details
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none resize-none"
                  placeholder="Tell us more about your project..."
                />
                <div className="text-right text-xs text-[#6b7280] mt-1">
                  {formData.details.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                  Upload Images (Optional, max 3)
                </label>
                <div className="space-y-2">
                  {formData.images.length < 3 && (
                    <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-[#00ff88] transition-all">
                      <Upload size={20} className="text-[#00ff88]" />
                      <span className="text-sm text-[#b4b4b4]">Choose files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <span className="text-sm text-white truncate">{file.name}</span>
                      <button
                        onClick={() => removeImage(index)}
                        className="text-[#ff6b35] hover:text-[#ff6b35]/70"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button3D variant="ghost" className="flex-1" onClick={() => setStep(1)}>
                  ← Back
                </Button3D>
                <Button3D
                  className="flex-1"
                  onClick={() => setStep(3)}
                  disabled={formData.projectTypes.length === 0 || !formData.scope}
                >
                  Review & Submit →
                </Button3D>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-white mb-4">Review Your Information</h3>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-[#6b7280] mb-1">Contact</div>
                  <div className="text-white">{formData.name}</div>
                  <div className="text-[#b4b4b4] text-sm">
                    {formData.phone} • {formData.email}
                  </div>
                  <div className="text-[#b4b4b4] text-sm">{formData.city}</div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-[#6b7280] mb-1">Project</div>
                  <div className="text-white mb-1">
                    {formData.projectTypes.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
                  </div>
                  <div className="text-[#b4b4b4] text-sm">
                    {formData.scope} • {formData.timeline}
                  </div>
                  {formData.details && (
                    <div className="text-[#b4b4b4] text-sm mt-2">{formData.details}</div>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" required />
                <span className="text-sm text-[#b4b4b4]">
                  I agree to the privacy policy and terms of service
                </span>
              </label>

              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{submitError}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button3D variant="ghost" className="flex-1" onClick={() => setStep(2)} disabled={isSubmitting}>
                  ← Back
                </Button3D>
                <Button3D className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button3D>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
