import React from 'react';
import { Users, History, Target, Award, Globe, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-2 block">Since 2013</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Hanumantay Enterprise – 10 Years of Excellence</h1>
          <p className="text-xl text-slate-600 leading-relaxed font-light">
            We are one of the leading wholesalers of premium cotton hankies, scarves, and accessories. 
            We specialize in top-quality fabric products trusted by retailers across Gujarat.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            {/* Changed from aspect-ratio to fixed height to ensure visibility */}
            <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1000&auto=format&fit=crop" 
                alt="Textile Excellence" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-8 rounded-xl shadow-xl max-w-xs hidden lg:block">
              <p className="font-serif text-2xl font-bold mb-1">1M+</p>
              <p className="text-slate-400 text-sm">Products delivered to satisfied retailers worldwide.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Our Legacy</h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
              For over 10 years, we have been delivering the best quality at the most competitive wholesale prices. 
              Our journey began in the bustling markets of Ahmedabad with a simple mission: to provide retailers with fabrics that their customers will love and trust.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              Today, Hanumantay Enterprise stands as a symbol of trust and quality in the wholesale textile market. From pure cotton handkerchiefs to designer silk scarves, every product that leaves our warehouse is quality checked.
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-slate-700">Premium Quality</span>
              </div>
               <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Globe className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-slate-700">Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-slate-50 rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integrity</h3>
              <p className="text-slate-600">Honest pricing and transparent dealings with all our retail partners.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Customer First</h3>
              <p className="text-slate-600">We grow when our retailers grow. Your success is our priority.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Consistency</h3>
              <p className="text-slate-600">Maintaining the same high quality in every batch, year after year.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;