'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  if (status === 'loading') return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (!session) return <div className="container mx-auto px-4 py-8">Redirecting...</div>;

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Failed to delete product.');
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <Link href="/add-product" className="btn btn-primary">+ Add Product</Link>
        </div>

        {loading ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead><tr><th>ID</th><th>Title</th><th>Price</th><th>Actions</th></tr></thead>
              <tbody>
                {[1,2,3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td><div className="h-4 bg-base-300 rounded w-8"></div></td>
                    <td><div className="h-4 bg-base-300 rounded w-32"></div></td>
                    <td><div className="h-4 bg-base-300 rounded w-16"></div></td>
                    <td><div className="h-8 bg-base-300 rounded w-20"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg opacity-75">No products yet.</p>
            <Link href="/add-product" className="btn btn-primary mt-4">Add Your First Product</Link>
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
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={product.image || `https://picsum.photos/seed/${product.id}/100/100`} alt={product.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.title}</div>
                          <div className="text-sm opacity-50 line-clamp-1">{product.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{product.price}</td>
                    <td>{product.dateAdded}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`} className="btn btn-ghost btn-sm">View</Link>
                        <button
                          onClick={() => handleDelete(product.id, product.title)}
                          className="btn btn-ghost btn-sm text-error"
                        >
                          Delete
                        </button>
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