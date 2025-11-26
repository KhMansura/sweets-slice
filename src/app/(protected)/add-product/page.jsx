// src/app/(protected)/add-product/page.jsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',   // ✅ Changed from 'desc'
    fullDesc: '',
    price: '',
    image: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (status === 'loading') return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (!session) return <div className="container mx-auto px-4 py-8">Redirecting...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Adding product...');
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}` // ✅ Required!
        },
        body: JSON.stringify({
          title: formData.title,
          shortDesc: formData.shortDesc,
          fullDesc: formData.fullDesc,
          price: formData.price,
          category: "Uncategorized",
          image: formData.image.trim() || undefined
        }),
      });

    //   if (res.ok) {
    //     const product = await res.json();
    //     setMessage(`✅ Product "${product.title}" added successfully!`);
    //     setFormData({ title: '', shortDesc: '', fullDesc: '', price: '', image: '' });
    //     setTimeout(() => router.push('/products'), 2000);
    //   } else {
    //     const error = await res.json();
    //     setMessage(`❌ ${error.error || 'Failed to add product'}`);
    //   }
    // } catch (err) {
    //   setMessage('❌ Network error. Please try again.');
    // } finally {
    //   setLoading(false);
     if (res.ok) {
        const product = await res.json();
        toast.success(`✅ "${product.title}" added!`, { id: loadingToast });
        setFormData({ title: '', shortDesc: '', fullDesc: '', price: '', image: '' });
        setTimeout(() => router.push('/products'), 1500);
      } else {
        const error = await res.json();
        toast.error(`❌ ${error.error || 'Failed to add product'}`, { id: loadingToast });
      }
    } catch (err) {
      toast.error('⚠️ Network error. Please try again.', { id: loadingToast });
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <Link href="/products" className="btn btn-ghost">← Cancel</Link>
        </div>

        {message && (
          <div className={`alert mb-6 ${message.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card bg-white p-6 shadow">
          <div className="mb-4">
            <label className="label"><span className="label-text">Title</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="e.g. Vanilla Princess Cake"
            />
          </div>
          <div className="mb-4">
            <label className="label"><span className="label-text">Short Description</span></label>
            <textarea
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
              rows={2}
              placeholder="One-line description (e.g., Light vanilla sponge with fresh strawberries)"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="label"><span className="label-text">Full Description</span></label>
            <textarea
              name="fullDesc"
              value={formData.fullDesc}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Detailed description (ingredients, serving size, allergens, etc.)"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="label"><span className="label-text">Price</span></label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="৳1,200 or $24.99"
            />
          </div>
          <div className="mb-6">
            <label className="label"><span className="label-text">Image URL (optional)</span></label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://via.placeholder.com/400x300?text=No+Image"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}