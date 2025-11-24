'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
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
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const product = await res.json();
        setMessage(`✅ Product "${product.title}" added successfully!`);
        setFormData({ title: '', desc: '', price: '', image: '' });
        setTimeout(() => router.push('/products'), 2000);
      } else {
        const error = await res.json();
        setMessage(`❌ ${error.error || 'Failed to add product'}`);
      }
    } catch (err) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
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
              placeholder="e.g. Wireless Headphones"
            />
          </div>
          <div className="mb-4">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Short product description"
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
              placeholder="$99.99"
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
              placeholder="https://example.com/image.jpg"
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