// src/app/contact/ContactForm.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-3xl">📬</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Get in <span className="text-pink-600">Touch</span>
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions? Want a custom cake for an event? We'd love to hear from you!
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="card bg-white shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📍 Visit Us</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">🏠</span>
                <div>
                  <h3 className="font-bold">Bakery & Studio</h3>
                  <p className="text-gray-700">House 45, Road 12, Gulshan-1<br />Dhaka 1212, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">🕒</span>
                <div>
                  <h3 className="font-bold">Opening Hours</h3>
                  <p className="text-gray-700">
                    Monday–Saturday: 9:00 AM – 8:00 PM<br />
                    Sunday: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">🚚</span>
                <div>
                  <h3 className="font-bold">Delivery</h3>
                  <p className="text-gray-700">
                    Free delivery across Dhaka for orders over ৳800.<br />
                    Order 24 hours ahead for best availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📞 Contact Info</h2>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-700">Phone</div>
                <a href="tel:+8801712345678" className="link link-primary hover:link-hover">
                  +880 1712-345678
                </a>
              </div>
              <div>
                <div className="font-medium text-gray-700">Email</div>
                <a href="mailto:hello@sweetslice.com" className="link link-primary hover:link-hover">
                  hello@sweetslice.com
                </a>
              </div>
              <div>
                <div className="font-medium text-gray-700">Social</div>
                <div className="flex gap-3 mt-1">
                  <Link href="#" className="btn btn-circle btn-ghost">
                    <span className="text-xl">📱</span>
                  </Link>
                  <Link href="#" className="btn btn-circle btn-ghost">
                    <span className="text-xl">📘</span>
                  </Link>
                  <Link href="#" className="btn btn-circle btn-ghost">
                    <span className="text-xl">📸</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="card bg-white shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">✍️ Send a Message</h2>

            {status === 'success' && (
              <div className="alert alert-success mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Thank you! We'll get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="alert alert-error mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Oops! Something went wrong. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label"><span className="label-text">Name</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="label"><span className="label-text">Subject</span></label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="e.g. Custom wedding cake"
                />
              </div>
              <div>
                <label className="label"><span className="label-text">Message</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="textarea textarea-bordered w-full"
                  rows={5}
                  placeholder="Tell us about your event, preferences, or questions..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn-primary w-full mt-2"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-500 text-center">
              🕒 We reply within 24 hours on weekdays.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}