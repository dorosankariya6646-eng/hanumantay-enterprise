import React from 'react';
import { APP_NAME, ADDRESS, WORKING_HOURS, WHATSAPP_DISPLAY } from '../constants';
import { MapPin, Phone, Clock, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
             <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-slate-900 font-serif font-bold text-xl mr-3">
                  H
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl tracking-wide">{APP_NAME}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Wholesale & Export</p>
                </div>
             </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              One of the leading wholesalers of premium cotton hankies, scarves, and accessories in Gujarat. 10+ years of trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Explore</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('catalog')}>Men's Hankies</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('catalog')}>Women's Scarves</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('catalog')}>Gift Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('wholesale')}>Wholesale Inquiry</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-white/50 shrink-0" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-white/50 shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </li>
               <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-white/50 shrink-0" />
                <span>sales@hanumantay.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Working Hours</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-white/50 shrink-0" />
                <span>{WORKING_HOURS}</span>
              </li>
              <li className="text-xs pt-2">
                <span className="bg-green-900/50 text-green-400 px-3 py-1 rounded-full border border-green-800">
                  Open for Wholesale Inquiries
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500 items-center">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            {onNavigate && (
              <button 
                onClick={() => onNavigate('admin')} 
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Admin Login"
              >
                <Lock className="w-3 h-3" /> Admin Login
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
