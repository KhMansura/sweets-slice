// ✅ src/app/products/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.shortDesc?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Delicious Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handcrafted with love in Dhaka. All cakes are made fresh to order.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Search Desserts</span>
              </label>
              <input
                type="text"
                placeholder="e.g. chocolate, mango..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-white shadow animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="card-body">
                  <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-16 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🍰</div>
            <h3 className="text-xl font-bold mb-2">No desserts found</h3>
            <p className="text-gray-600 mb-4">Try a different search or category.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <figure className="h-48 overflow-hidden bg-gray-50">
                  {/* <img
                    src={product.image?.trim() || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.title}
                    onError={(e) => {
                      e.target.onerror = null; // prevent loop
                      e.target.src = "https://via.placeholder.com/400x300?text=Image+Error";
                    }}
                    className="w-full h-full object-cover"
                  /> */}
                  <ProductImage 
  src={product.image} 
  alt={product.title}
  className="w-full h-full"
/>
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg font-bold line-clamp-1">{product.title}</h2>
                    <span className="badge badge-secondary">{product.category || 'Uncategorized'}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {product.shortDesc || 'No description available.'}
                  </p>
                  <div className="card-actions justify-between items-center mt-3">
                    <span className="text-xl font-bold text-pink-600">
                      {product.price || '৳0'}
                    </span>
                    <Link 
                      href={`/products/${product.id}`} 
                      className="btn btn-outline btn-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          All prices in BDT (৳) • Free delivery in Dhaka
        </div>
      </div>
    </div>
  );
}





