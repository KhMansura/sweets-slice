// src/app/(protected)/manage-products/page.jsx
// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import ProductImage from "@/components/ProductImage";

// export default function ManageProductsPage() {
//   // ✅ HOOKS FIRST — Always call hooks at the top level
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ EARLY RETURNS AFTER HOOKS
//   if (status === "loading") {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         Loading authentication...
//       </div>
//     );
//   }
//   if (!session) {
//     router.push("/login");
//     return null;
//   }

//   // ✅ Fetch products from Express backend
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//         );
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setProducts(data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//         setError("Failed to load products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   // ✅ Delete product (protected)
//   const handleDelete = async (id, title) => {
//     if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${session.accessToken}`, // ✅ Required!
//           },
//         }
//       );

//       if (res.ok) {
//         setProducts(products.filter((p) => p.id !== id));
//       } else {
//         const errData = await res.json();
//         alert(`Delete failed: ${errData.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Network error. Please check console.");
//     }
//   };

//   return (
//     <div className="py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Manage Products</h1>
//           <Link href="/add-product" className="btn btn-primary">
//             + Add Product
//           </Link>
//         </div>

//         {/* Error Banner */}
//         {error && (
//           <div className="alert alert-error mb-6">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="stroke-current shrink-0 h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Loading Skeleton */}
//         {loading ? (
//           <div className="overflow-x-auto">
//             <table className="table table-zebra w-full">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Date Added</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[1, 2, 3].map((i) => (
//                   <tr key={i} className="animate-pulse">
//                     <td>
//                       <div className="h-4 bg-base-300 rounded w-6"></div>
//                     </td>
//                     <td>
//                       <div className="h-4 bg-base-300 rounded w-32"></div>
//                     </td>
//                     <td>
//                       <div className="h-4 bg-base-300 rounded w-16"></div>
//                     </td>
//                     <td>
//                       <div className="h-4 bg-base-300 rounded w-24"></div>
//                     </td>
//                     <td>
//                       <div className="h-8 bg-base-300 rounded w-20"></div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-5xl mb-4">📦</div>
//             <h3 className="text-xl font-bold mb-2">No products found</h3>
//             <p className="text-gray-600 mb-4">
//               Add your first product to get started.
//             </p>
//             <Link href="/add-product" className="btn btn-primary">
//               Add Product
//             </Link>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table table-zebra w-full">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Date Added</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product.id} className="hover">
//                     <td className="font-mono">{product.id}</td>
//                     <td>
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle w-12 h-12">
//                             {/* <img
//                               src={
//                                 (product.image?.trim() || "").startsWith("http")
//                                   ? product.image.trim()
//                                   : "https://via.placeholder.com/100x100?text=No+Image"
//                               }
//                               alt={product.title}
//                               onError={(e) => {
//                                 e.target.src =
//                                   "https://via.placeholder.com/100x100?text=Error";
//                               }}
//                               className="object-cover"
//                             /> */}
//                             <ProductImage 
//   src={product.image} 
//   alt={product.title}
//   className="w-full h-full"
// />
//                           </div>
//                         </div>
//                         <div>
//                           <div className="font-bold">{product.title}</div>
//                           <div className="text-sm opacity-70 line-clamp-1">
//                             {product.shortDesc || "No description"}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="font-bold text-pink-600">{product.price}</td>
//                     <td>{product.dateAdded || "N/A"}</td>
//                     <td>
//                       <div className="flex gap-2">
//                         <Link
//                           href={`/products/${product.id}`}
//                           className="btn btn-ghost btn-sm"
//                         >
//                           View
//                         </Link>
//                         <button
//                           onClick={() =>
//                             handleDelete(product.id, product.title)
//                           }
//                           className="btn btn-ghost btn-sm text-error"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";

export default function ManageProductsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ useEffect used for redirect AFTER hooks
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const loadProducts = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setProducts(data);
          setError(null);
        } catch (err) {
          console.error("Failed to load products:", err);
          setError("Failed to load products. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
    }
  }, [status]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        const errData = await res.json();
        alert(`Delete failed: ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error. Please check console.");
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8 text-center">Loading authentication...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="container mx-auto px-4 py-8 text-center">Redirecting...</div>;
  }

  // ✅ Render table only when authenticated
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <Link href="/add-product" className="btn btn-primary">+ Add Product</Link>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* Table or Empty State */}
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <Link href="/add-product" className="btn btn-primary">Add Product</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="font-mono">{product.id}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <ProductImage src={product.image} alt={product.title} className="w-full h-full" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.title}</div>
                          <div className="text-sm opacity-70 line-clamp-1">{product.shortDesc || "No description"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold text-pink-600">{product.price}</td>
                    <td>{product.dateAdded || "N/A"}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`} className="btn btn-ghost btn-sm">View</Link>
                        <button onClick={() => handleDelete(product.id, product.title)} className="btn btn-ghost btn-sm text-error">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
