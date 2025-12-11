import React, { useState, useRef, useEffect } from 'react';
import { Product, Category } from '../types';
import { Lock, Plus, Trash2, Edit2, Save, X, Image as ImageIcon, LogOut, UploadCloud, Link as LinkIcon, Download, Upload, RefreshCw } from 'lucide-react';
import { APP_NAME } from '../constants';

interface AdminProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onNavigate: (page: string) => void;
}

const Admin: React.FC<AdminProps> = ({ products, setProducts, onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: Category.SCARVES,
    price: 0,
    minOrder: 12,
    image: '',
    description: '',
    packsAvailable: ['12pc']
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid PIN');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setFormData(product);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: Category.SCARVES,
      price: 0,
      minOrder: 12,
      image: '',
      description: '',
      packsAvailable: ['12pc']
    });
    setIsEditing(null);
    setShowAddForm(false);
  };

  // --- Image Handling with Compression ---
  const compressImage = (base64: string, maxWidth = 600, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(base64);

        const ratio = maxWidth / img.width;
        // Only resize if bigger than maxWidth
        const width = img.width > maxWidth ? maxWidth : img.width;
        const height = img.width > maxWidth ? img.height * ratio : img.height;

        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = 'white'; // Handle transparent PNGs turning black
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(base64);
    });
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawBase64 = reader.result as string;
        try {
          const compressed = await compressImage(rawBase64);
          setFormData(prev => ({ ...prev, image: compressed }));
        } catch (e) {
          console.error("Compression failed", e);
          setFormData(prev => ({ ...prev, image: rawBase64 }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (JPG, PNG, WEBP)');
    }
  };

  // --- Global Paste Listener ---
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (!showAddForm) return;
      
      // 1. Check for Files
      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          e.preventDefault();
          handleFileUpload(file);
        }
      }
      // 2. Check for Text (URL)
      else if (e.clipboardData) {
        const text = e.clipboardData.getData('text');
        // If it looks like a URL or an image path
        if (text && (text.startsWith('http') || text.match(/\.(jpeg|jpg|gif|png|webp)$/i))) {
             e.preventDefault();
             setFormData(prev => ({ ...prev, image: text }));
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [showAddForm]);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // --- Data Management ---
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "hanumantay_products_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          if (window.confirm(`This will replace your current ${products.length} products with ${json.length} products from the file. Continue?`)) {
            setProducts(json);
            alert("Products imported successfully!");
          }
        } else {
          alert("Invalid file format.");
        }
      } catch (err) {
        alert("Error reading file");
      }
    };
    reader.readAsText(file);
    // Reset input
    if (backupInputRef.current) backupInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === isEditing ? { ...formData, id: isEditing } as Product : p));
    } else {
      const newProduct: Product = {
        ...formData as Product,
        id: Date.now().toString(),
        packsAvailable: Array.isArray(formData.packsAvailable) ? formData.packsAvailable : ['Standard Pack']
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    resetForm();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">{APP_NAME} Admin</h2>
          <p className="text-slate-500 mb-6">Please enter your security PIN to access the dashboard.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center text-2xl tracking-widest px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
              placeholder="••••"
              maxLength={4}
            />
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-400">Default PIN: 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <span className="font-serif font-bold text-lg">Admin Panel</span>
             <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-300">v3.1</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="text-sm text-slate-300 hover:text-white">Website</button>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm bg-red-600/20 text-red-300 px-3 py-1.5 rounded hover:bg-red-600/30 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm">Managing {products.length} products</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium"
              title="Download backup"
            >
              <Download className="w-4 h-4" /> Backup Data
            </button>
            <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium cursor-pointer">
              <Upload className="w-4 h-4" /> Restore Data
              <input 
                ref={backupInputRef}
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={handleImportData}
              />
            </label>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none bg-white"
                    >
                      {Object.values(Category).filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                    <input 
                      required 
                      type="number" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">MOQ</label>
                    <input 
                      required 
                      type="number" 
                      value={formData.minOrder} 
                      onChange={e => setFormData({...formData, minOrder: Number(e.target.value)})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* Upload Section */}
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Product Photo</label>
                   <div className="space-y-4">
                     <div 
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        tabIndex={0}
                        className={`
                          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all outline-none 
                          ${formData.image 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-blue-300 bg-blue-50 hover:border-blue-500 hover:bg-blue-100'
                          }
                        `}
                     >
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        />
                        
                        {formData.image ? (
                           <div className="relative group">
                              <div className="h-48 w-full flex items-center justify-center bg-white rounded-lg overflow-hidden border border-slate-200">
                                <img src={formData.image} alt="Preview" className="h-full w-full object-contain" />
                              </div>
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                 <RefreshCw className="w-8 h-8 text-white mb-2" />
                                 <p className="text-white font-medium">Click or Paste to Replace</p>
                              </div>
                           </div>
                        ) : (
                           <div className="py-4">
                              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 shadow-sm">
                                 <UploadCloud className="w-8 h-8" />
                              </div>
                              <h3 className="text-slate-900 font-bold text-base mb-1">Upload Product Image</h3>
                              <p className="text-slate-500 text-xs">Drop image here or Paste (Ctrl+V)</p>
                           </div>
                        )}
                     </div>

                     {/* URL Fallback */}
                     <div className="flex items-center gap-2">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-xs text-slate-400 font-medium uppercase">OR</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                     </div>

                     <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input 
                           type="text" 
                           placeholder="Paste image URL here..."
                           value={formData.image?.startsWith('data:') ? '' : formData.image} 
                           onChange={(e) => setFormData({...formData, image: e.target.value})}
                           className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none bg-white"
                        />
                     </div>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button type="button" onClick={resetForm} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 flex items-center gap-2">
                    <Save className="w-4 h-4" /> {isEditing ? 'Update Product' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product List Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium w-24">Image</th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                      <img src={product.image} alt="" className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-900">{product.name}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs border border-slate-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900">₹{product.price}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-slate-200" />
              <p>No products yet. Click "Add Product" to start building your catalog.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;