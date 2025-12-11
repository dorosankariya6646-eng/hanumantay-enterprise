import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Send, Wand2, Loader2, AlertCircle, Phone, MapPin, Building2, User, Mail, Box } from 'lucide-react';
import { generateInquiryDraft } from '../services/geminiService';
import { InquiryFormState } from '../types';

interface WholesaleProps {
  selectedProduct?: Product | null;
}

const Wholesale: React.FC<WholesaleProps> = ({ selectedProduct }) => {
  const [formData, setFormData] = useState<InquiryFormState>({
    fullName: '',
    email: '',
    whatsapp: '',
    businessName: '',
    city: '',
    productType: '',
    message: ''
  });
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        productType: selectedProduct.category,
        message: `I am interested in ordering the "${selectedProduct.name}". Please provide bulk pricing for [QUANTITY] units.`
      }));
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAiGenerate = async () => {
    if (!formData.businessName) {
      alert("Please enter your Business Name first.");
      return;
    }
    if (!aiPrompt) {
      alert("Please enter keywords (e.g., 'Bulk order scarves for Mumbai store').");
      return;
    }

    setIsGenerating(true);
    const draft = await generateInquiryDraft(formData.businessName, aiPrompt);
    setFormData(prev => ({ ...prev, message: draft }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ 
        fullName: '', 
        email: '', 
        whatsapp: '', 
        businessName: '', 
        city: '',
        productType: '',
        message: '' 
      });
      setAiPrompt('');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-slate-900 py-10 px-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-slate-800/50 mix-blend-overlay"></div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2 relative z-10">Wholesale Inquiry Form</h1>
            <p className="text-slate-300 relative z-10">Get the best price list delivered to your WhatsApp or Email.</p>
          </div>
          
          <div className="p-8 md:p-10">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Inquiry Received!</h3>
                <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                  Thank you for contacting <strong>Hanumantay Enterprise</strong>. Our sales team has received your details and will contact you via WhatsApp shortly.
                </p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Info */}
                <div className="space-y-6">
                   <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Business Contact Details</h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="Full Name *"
                      />
                    </div>
                    <div className="relative">
                      <Building2 className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="Business Name *"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Phone className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="WhatsApp Number *"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="Email Address (Optional)"
                      />
                    </div>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <MapPin className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="City *"
                      />
                    </div>
                    <div className="relative">
                      <Box className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="productType"
                        required
                        value={formData.productType}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                        placeholder="Product Type (e.g. Scarves) *"
                      />
                    </div>
                  </div>
                </div>

                {/* AI & Message */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Requirement Details</h3>
                  
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-blue-900 flex items-center gap-2">
                        <Wand2 className="w-4 h-4" /> AI Message Writer
                      </label>
                      <span className="text-[10px] text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200 font-medium">Gemini AI</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g. 500 white cotton hankies for retail store in Surat..."
                        className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      />
                      <button 
                        type="button"
                        onClick={handleAiGenerate}
                        disabled={isGenerating}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors whitespace-nowrap"
                      >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        Generate Draft
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Custom Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                      placeholder="Please specify your quantity requirements and any specific fabric needs..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending to Hanumantay...
                    </>
                  ) : (
                    <>
                    <Send className="w-5 h-5" /> Send Inquiry Now
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4 text-sm text-slate-500">
           <span className="flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Your data is secure. We never share your details with third parties.</span>
        </div>
      </div>
    </div>
  );
};

export default Wholesale;
