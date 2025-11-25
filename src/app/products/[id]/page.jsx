// import React from "react";
// export default  function page({params}) {
//   const {id} =  params;
//   return <div>Products details ppage : {id} </div>;
// }
// import React from 'react'

// export default function page() {
//   // const {slug} =params;
//   return (
//     <div>

//       products details :01
//     </div>
//   )
// }
// export default async function Page({ params }) {
//   // console.log("params:", params);
//   const { id } =await params;
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//   const data = await res.json();
//   return <div>Product details page: {data.name} </div>;
// }
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function ProductDetailPage({ params }) {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/products/${params.id}`)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [params.id]);

//   if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
//   if (!product) return <div className="container mx-auto px-4 py-8 text-center text-error">Product not found</div>;

//   return (
//     <div className="py-8">
//       <div className="container mx-auto px-4">
//         <Link href="/products" className="btn btn-ghost mb-6">← Back to Products</Link>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <img
//               src={product.image || `https://picsum.photos/seed/${product.id}/600/400`}
//               alt={product.title}
//               className="w-full rounded-lg shadow"
//             />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <p className="text-gray-600 mb-6">{product.desc}</p>

//             <div className="space-y-4">
//               <div>
//                 <span className="text-2xl font-bold text-primary">{product.price}</span>
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 <div><strong>Added:</strong> {product.dateAdded}</div>
//                 <div><strong>Category:</strong> Electronics</div>
//               </div>
//               <div className="pt-4 border-t">
//                 <button className="btn btn-primary mr-2">Add to Cart</button>
//                 <button className="btn btn-outline">Buy Now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//  src/app/products/[id]/page.jsx
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ProductDetailPage({ params }) {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   fetch("/public/products.json")
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       const found = data.find((p) => p.id === parseInt(params.id));
//   //       setProduct(found);
//   //       setLoading(false);
//   //     })
//   //     .catch(() => setLoading(false));
//   // }, [params.id]);

//   useEffect(() => {
//     // ✅ Await params.id first — this is critical!
//     const loadProduct = async () => {
//       try {
//         // 👇 This is the fix: await params.id
//         const id = parseInt(await params.id);
        
//         const res = await fetch('/products.json');
//         const data = await res.json();
//         const found = data.find(p => p.id === id); // Now compares 9 === 9

//         setProduct(found);
//       } catch (err) {
//         console.error('Error loading product:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProduct();
//   }, [params.id]); // Keep dependency

//   if (loading)
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
//         <p className="mt-4">Preparing your dessert...</p>
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <div className="text-6xl mb-4">😢</div>
//         <h2 className="text-2xl font-bold mb-2">Dessert Not Found</h2>
//         <p className="mb-4">The cake you're looking for has been eaten!</p>
//         <Link href="/products" className="btn btn-primary">
//           Browse Our Menu
//         </Link>
//       </div>
//     );

//   return (
//     <div className="py-8">
//       <div className="container mx-auto px-4">
//         <div className="mb-6">
//           <Link href="/products" className="btn btn-ghost">
//             ← Back to Menu
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Image */}
//           <div className="bg-white p-4 rounded-xl shadow">
//             <img
//               src={`${product.id}?auto=compress&cs=tinysrgb&w=400`}
//               alt={product.title}
//               className="w-full h-auto rounded-lg"
//             />
//           </div>

//           {/* Details */}
//           <div>
//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="badge badge-secondary">{product.category}</span>
//               <span className="badge badge-outline">Freshly Baked</span>
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//               {product.title}
//             </h1>

//             <div className="flex items-center gap-4 mb-4">
//               <span className="text-3xl font-bold text-pink-600">
//                 {product.price}
//               </span>
//               <span className="text-sm text-gray-500">• In stock</span>
//             </div>

//             <div className="mb-6 p-4 bg-vanilla-50 rounded-lg">
//               <h3 className="font-bold mb-2">🍰 About This Dessert</h3>
//               <p className="text-gray-700">{product.fullDesc}</p>
//             </div>

//             {/* Meta Info */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Preparation</h4>
//                 <p>24 hours notice required</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Serves</h4>
//                 <p>6–8 people</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Added</h4>
//                 <p>{new Date(product.dateAdded).toLocaleDateString("en-GB")}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Allergens</h4>
//                 <p>Eggs, Dairy, Gluten</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="btn btn-primary flex-1">🛒 Add to Cart</button>
//               <button className="btn btn-outline flex-1">❤️ Wishlist</button>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl text-center">
//           <h3 className="text-xl font-bold mb-2">Need a custom cake?</h3>
//           <p className="mb-4">
//             We do birthdays, weddings, and corporate events!
//           </p>
//           <Link href="/contact" className="btn btn-pink">
//             Order Custom Cake
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// ✅ src/app/products/[id]/page.jsx — FINAL CORRECT VERSION

// 'use client';

// import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation'; // 👈 Import useParams
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import ProductImage from '@/components/ProductImage';

// export default function ProductDetailPage() {
//   const params = useParams(); // 👈 Get params via hook
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         const id = parseInt(params.id); // ✅ Now safe — useParams returns plain object
        
//         const res = await fetch('/products.json');
//         const data = await res.json();
//         const found = data.find(p => p.id === id);

//         setProduct(found);
//       } catch (err) {
//         console.error('Error loading product:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProduct();
//   }, [params.id]); // 👈 Dependency on params.id

//   if (loading)
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
//         <p className="mt-4">Preparing your dessert...</p>
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <div className="text-6xl mb-4">😢</div>
//         <h2 className="text-2xl font-bold mb-2">Dessert Not Found</h2>
//         <p className="mb-4">The cake you're looking for has been eaten!</p>
//         <Link href="/products" className="btn btn-primary">
//           Browse Our Menu
//         </Link>
//       </div>
//     );

//   return (
//     <div className="py-8">
//       <div className="container mx-auto px-4">
//         <div className="mb-6">
//           <Link href="/products" className="btn btn-ghost">
//             ← Back to Menu
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Image */}
//           <div className="bg-white p-4 rounded-xl shadow">
//             {/* <img
//               src={`${product.image}?auto=compress&cs=tinysrgb&w=400`}
//               alt={product.title}
//               className="w-full h-auto rounded-lg"
//             /> */}
//             <ProductImage
//   src={product.image} 
//   alt={product.title}
//   className="w-full h-full"
// />
//           </div>

//           {/* Details */}
//           <div>
//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="badge badge-secondary">{product.category}</span>
//               <span className="badge badge-outline">Freshly Baked</span>
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//               {product.title}
//             </h1>

//             <div className="flex items-center gap-4 mb-4">
//               <span className="text-3xl font-bold text-pink-600">
//                 {product.price}
//               </span>
//               <span className="text-sm text-gray-500">• In stock</span>
//             </div>

//             <div className="mb-6 p-4 bg-vanilla-50 rounded-lg">
//               <h3 className="font-bold mb-2">🍰 About This Dessert</h3>
//               <p className="text-gray-700">{product.fullDesc}</p>
//             </div>

//             {/* Meta Info */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Preparation</h4>
//                 <p>24 hours notice required</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Serves</h4>
//                 <p>6–8 people</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Added</h4>
//                 <p>{new Date(product.dateAdded).toLocaleDateString("en-GB")}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h4 className="font-medium text-gray-500">Allergens</h4>
//                 <p>Eggs, Dairy, Gluten</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="btn btn-primary flex-1">🛒 Add to Cart</button>
//               <button className="btn btn-outline flex-1">❤️ Wishlist</button>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl text-center">
//           <h3 className="text-xl font-bold mb-2">Need a custom cake?</h3>
//           <p className="mb-4">
//             We do birthdays, weddings, and corporate events!
//           </p>
//           <Link href="/contact" className="btn btn-pink">
//             Order Custom Cake
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/app/products/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProductImage from '@/components/ProductImage';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const id = parseInt(params.id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`);

        if (!res.ok) {
          throw new Error('Product not found');
        }

        const product = await res.json(); // ✅ This is a single object

        setProduct(product);
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
        <p className="mt-4">Preparing your dessert...</p>
      </div>
    );

  if (!product)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold mb-2">Dessert Not Found</h2>
        <p className="mb-4">The cake you're looking for has been eaten!</p>
        <Link href="/products" className="btn btn-primary">
          Browse Our Menu
        </Link>
      </div>
    );

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/products" className="btn btn-ghost">
            ← Back to Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-white p-4 rounded-xl shadow">
            <ProductImage
              src={product.image}
              alt={product.title}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-secondary">{product.category}</span>
              <span className="badge badge-outline">Freshly Baked</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-pink-600">
                {product.price}
              </span>
              <span className="text-sm text-gray-500">• In stock</span>
            </div>

            <div className="mb-6 p-4 bg-vanilla-50 rounded-lg">
              <h3 className="font-bold mb-2">🍰 About This Dessert</h3>
              <p className="text-gray-700">{product.fullDesc}</p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500">Preparation</h4>
                <p>24 hours notice required</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500">Serves</h4>
                <p>6–8 people</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500">Added</h4>
                <p>{new Date(product.dateAdded).toLocaleDateString("en-GB")}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500">Allergens</h4>
                <p>Eggs, Dairy, Gluten</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary flex-1">🛒 Add to Cart</button>
              <button className="btn btn-outline flex-1">❤️ Wishlist</button>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-2">Need a custom cake?</h3>
          <p className="mb-4">
            We do birthdays, weddings, and corporate events!
          </p>
          <Link href="/contact" className="btn btn-pink">
            Order Custom Cake
          </Link>
        </div>
      </div>
    </div>
  );
}