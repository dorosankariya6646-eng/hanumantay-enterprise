import React from 'react';
import { Product } from '../types';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onInquire: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInquire }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        
        {/* Quick info badge */}
        <div className="absolute bottom-3 left-3 flex gap-2">
           <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 shadow-sm border border-slate-100">
            MOQ: {product.minOrder}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="space-y-3 pt-3 border-t border-slate-50 mt-auto">
          {/* Price & Packs */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-400 mb-1">Wholesale Price</p>
              <p className="text-xl font-bold text-slate-900">₹{product.price}<span className="text-xs font-normal text-slate-500">/unit</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-1">Available Packs</p>
              <div className="flex gap-1 justify-end flex-wrap">
                {product.packsAvailable.map((pack, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {pack}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onInquire(product)}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
