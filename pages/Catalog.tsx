import React, { useState } from 'react';
import { Category, Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';

interface CatalogProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ onNavigate, onSelectProduct, products }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInquire = (product: Product) => {
    onSelectProduct(product);
    onNavigate('wholesale');
  };

  const categoryList = [
    'All',
    Category.SCARVES,
    Category.MEN_HANKIES,
    Category.MEN_PACKAGED,
    Category.HANKIES_BASKETS,
    Category.WOMEN_PRINTED
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-12 px-4">
         <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Wholesale Catalog</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Browse our premium collection of handkerchiefs and scarves. 
              Prices shown are indicative wholesale rates.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Mobile Search (visible only on small screens) */}
        <div className="md:hidden mb-6">
           <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filter
                  </h3>
                  {activeCategory !== 'All' && (
                    <button onClick={() => setActiveCategory('All')} className="text-xs text-red-500 font-medium hover:underline">
                      Reset
                    </button>
                  )}
                </div>
                
                <div className="space-y-1">
                  {categoryList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as Category | 'All')}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex justify-between items-center ${
                        activeCategory === cat
                          ? 'bg-slate-900 text-white font-medium shadow-md'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                    </button>
                  ))}
                </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             {/* Desktop Search & Count */}
             <div className="hidden md:flex justify-between items-center mb-6">
                <span className="text-sm text-slate-500 font-medium">Showing {filteredProducts.length} products</span>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search catalog..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
               </div>
             </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onInquire={handleInquire}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your category or search terms.</p>
                <button 
                  onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                  className="mt-6 px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
