// 'use client';
// import Link from 'next/link';
// import React from 'react';

// export default async function ProductsPage() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users')
//   const data = await res.json();
//   console.log({data});
//   return (
//     <div className='flex flex-col'>
//       this is products page

//       {/* <Link href="/products/1">product 1</Link>
//       <Link href='/products/2'>product 2</Link>
//       <Link href='/products/3'>product 3</Link>
//       <Link href='/products/4'>product 4</Link> */}
//       {
//         data.map(user => <Link key={user.id} href={`/products/${user.id}`}>{user.name}</Link>)
//       }
//     </div>
//   )
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/api/products')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-2">Products</h1>
//         <p className="text-gray-600 mb-6">Browse our latest collection.</p>

//         <div className="mb-6 flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="input input-bordered w-full"
//           />
//           <select className="select select-bordered w-full sm:w-auto">
//             <option>All Categories</option>
//             <option>Electronics</option>
//             <option>Home</option>
//           </select>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1,2,3,4,5,6].map(i => (
//               <div key={i} className="card bg-white animate-pulse">
//                 <div className="h-48 bg-base-300"></div>
//                 <div className="card-body">
//                   <div className="h-6 bg-base-300 rounded mb-2"></div>
//                   <div className="h-4 bg-base-300 rounded mb-4"></div>
//                   <div className="flex justify-between">
//                     <div className="h-6 w-16 bg-base-300 rounded"></div>
//                     <div className="h-8 w-20 bg-base-300 rounded"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map(product => (
//               <div key={product.id} className="card bg-white shadow hover:shadow-lg transition">
//                 <figure>
//                   <img
//                     src={product.image || `https://picsum.photos/seed/${product.id}/300/200`}
//                     alt={product.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 </figure>
//                 <div className="card-body">
//                   <h2 className="card-title">{product.title}</h2>
//                   <p className="line-clamp-2 text-sm opacity-80">{product.desc}</p>
//                   <div className="card-actions justify-between items-center mt-2">
//                     <span className="text-lg font-bold text-primary">{product.price}</span>
//                     <Link href={`/products/${product.id}`} className="btn btn-outline btn-sm">Details</Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// ✅ src/app/products/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

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

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-white shadow animate-pulse">
                <div className="h-48 bg-vanilla-50"></div>
                <div className="card-body">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
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
                <figure className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"/>
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg font-bold">{product.title}</h2>
                    <span className="badge badge-secondary">{product.category}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {product.shortDesc}
                  </p>
                  <div className="card-actions justify-between items-center mt-3">
                    <span className="text-xl font-bold text-pink-600">{product.price}</span>
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




// import Link from 'next/link'
// import axios from 'axios'


// export default async function ProductsPage(){
// const res = await fetch(`${process.env.BACKEND_URL}/products`)
// const products = await res.json()


// return (
// <div>
// <h1 className="text-2xl font-bold">Products</h1>
// <p className="text-sm text-gray-500">Browse available items</p>
// <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
// {products.map(p => (
// <article key={p.id} className="border rounded p-3 hover:shadow">
// <div className="h-36 bg-gray-100 flex items-center justify-center">Image</div>
// <h3 className="font-semibold mt-2">{p.title}</h3>
// <p className="text-sm text-gray-600 truncate">{p.short}</p>
// <div className="mt-2 flex items-center justify-between">
// <div className="text-lg font-bold">${p.price}</div>
// <Link href={`/products/${p.id}`} className="text-sm">Details</Link>
// </div>
// </article>
// ))}
// </div>
// </div>
// )
// }
