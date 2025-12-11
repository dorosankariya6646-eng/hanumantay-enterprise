import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Info, Phone, Grid } from 'lucide-react';
import { APP_NAME } from '../constants';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
    { name: 'Categories', id: 'catalog', icon: <Grid className="w-4 h-4 mr-2" /> },
    { name: 'Wholesale Inquiry', id: 'wholesale', icon: <Phone className="w-4 h-4 mr-2" /> },
    { name: 'About Us', id: 'about', icon: <Info className="w-4 h-4 mr-2" /> },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            {/* Logo placeholder */}
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 text-white font-serif font-bold text-xl mr-3 shadow-md">
              H
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl tracking-tight text-slate-900 leading-none">
                Hanumantay
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Enterprise</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-white bg-slate-900 shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium mt-2 ${
                  currentPage === item.id
                    ? 'text-white bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;