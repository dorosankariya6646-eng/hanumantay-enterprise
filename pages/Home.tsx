import React from 'react';
import { ArrowRight, Users, Box, ShieldCheck } from 'lucide-react';
import { APP_NAME, TAGLINE, PRODUCTS } from '../constants';
import { Category } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // Dynamically find images from the product list to keep things consistent
  const scarfImage = PRODUCTS.find(p => p.name.includes('Silk Scarf'))?.image || PRODUCTS[1].image;
  const hankyImage = PRODUCTS.find(p => p.name.includes('Premium Cotton'))?.image || PRODUCTS[0].image;
  const basketImage = PRODUCTS.find(p => p.category === Category.HANKIES_BASKETS)?.image;
  const womenImage = PRODUCTS.find(p => p.category === Category.WOMEN_PRINTED)?.image;

  const categories = [
    { name: Category.SCARVES, image: scarfImage },
    { name: Category.MEN_HANKIES, image: hankyImage },
    { name: Category.HANKIES_BASKETS, image: basketImage || '' },
    { name: Category.WOMEN_PRINTED, image: womenImage || '' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Premium Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1920" 
            alt="Fabric Background" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest uppercase mb-6">
            Since 2013 • Ahmedabad, India
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {APP_NAME}
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-12 font-light tracking-wide max-w-2xl mx-auto">
            {TAGLINE}. <br/>Sourcing excellence for over a decade.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button 
              onClick={() => onNavigate('catalog')}
              className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 min-w-[180px]"
            >
              Explore Catalog
            </button>
            <button 
              onClick={() => onNavigate('wholesale')}
              className="px-8 py-4 bg-transparent border border-white/30 text-white backdrop-blur-sm hover:bg-white/10 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 min-w-[180px]"
            >
              Wholesale Inquiry
            </button>
          </div>
        </div>
      </section>

      {/* Short About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-slate-900 mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">10 Years of Excellence</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are one of the leading wholesalers of premium cotton hankies, scarves, and accessories.
            Specializing in top-quality fabric products trusted by retailers across Gujarat and beyond.
            For over 10 years, Hanumantay Enterprise has been delivering the best quality at the most competitive wholesale prices.
          </p>
        </div>
      </section>

      {/* Category Showcase Tiles */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl font-serif font-bold text-slate-900">Our Collections</h2>
               <p className="text-slate-500 mt-2">Browse our specialized wholesale categories</p>
            </div>
            <button onClick={() => onNavigate('catalog')} className="text-slate-900 font-medium hover:underline hidden sm:flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigate('catalog')}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">{cat.name}</h3>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    View Products <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
             <button onClick={() => onNavigate('catalog')} className="text-slate-900 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
              View All Collections <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Retailers Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 bg-white text-slate-900 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">200+</h3>
              <p className="text-slate-500 font-medium">Trusted Retail Partners</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
               <div className="w-14 h-14 bg-white text-slate-900 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                <Box className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">1M+</h3>
              <p className="text-slate-500 font-medium">Units Sold Annually</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
               <div className="w-14 h-14 bg-white text-slate-900 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">100%</h3>
              <p className="text-slate-500 font-medium">Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-slate-800 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-slate-800 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">Ready to stock your store?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of successful retailers. Get our latest wholesale price list and catalog sent directly to your WhatsApp.
          </p>
          <button 
            onClick={() => onNavigate('wholesale')}
            className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-200"
          >
            Request Wholesale Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;