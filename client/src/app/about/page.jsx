// src/app/about/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

// import { Metadata } from "next"; // ✅ Add this at top

// export const metadata = {
//   title: "About Us • SweetSlice",
//   description: "Learn the story behind Dhaka's favorite handcrafted bakery.",
// };

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🏡</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Our <span className="text-pink-600">SweetSlice</span> Story
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Born in the heart of Dhaka, SweetSlice is more than a bakery — it’s
            a celebration of tradition, love, and the joy of sharing desserts
            with those who matter most.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              🌷 Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              To craft hand-made, high-quality desserts using locally-sourced
              ingredients — honoring Bangladeshi flavors while embracing modern
              techniques.
            </p>
            <p className="text-gray-700 mb-6">
              Every cake, cupcake, and tart is made fresh to order — because we
              believe sweets taste better when made with patience and care.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="badge badge-lg badge-primary">Fresh Daily</span>
              <span className="badge badge-lg badge-secondary">Dhaka-Made</span>
              <span className="badge badge-lg badge-accent">
                Family Recipes
              </span>
            </div>
          </div>
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 shadow-sm">
            <blockquote className="text-xl italic text-gray-700">
              “A cake is not just sugar and flour — it’s memory, celebration,
              and love, layered together.”
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <Image
                    src="https://i.ibb.co/6nH1JfK/profile.jpg"
                    alt="Founder"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Khandaker Mansura</div>
                <div className="text-sm text-gray-500">
                  Founder & Head Baker
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team / Process */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            🧁 How We Bake Happiness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌾",
                title: "Local Ingredients",
                desc: "Fresh eggs from Savar farms, milk from local dairies, and seasonal fruits from Dhaka markets.",
              },
              {
                icon: "👩‍🍳",
                title: "Handcrafted with Care",
                desc: "No mass production — every dessert is baked, frosted, and decorated by our small team in Gulshan.",
              },
              {
                icon: "📦",
                title: "Same-Day Delivery",
                desc: "Order by 6 PM, and we deliver warm, fresh desserts across Dhaka the next day — free of charge.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="card bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body items-center text-center p-6">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Taste the Love?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Whether it’s a birthday, anniversary, or just because — we’re here
            to make your moments sweeter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn btn-primary px-8 py-3">
              🍰 Browse Our Menu
            </Link>
            <Link
              href="/contact"
              className="btn btn-outline btn-secondary px-8 py-3"
            >
              📩 Custom Orders
            </Link>
          </div>
          <div className="mt-6 text-sm text-gray-600">
            📍 Based in Dhaka, Bangladesh • 🕒 Open 9 AM – 8 PM (Order 24h
            ahead)
          </div>
        </section>
      </div>
    </div>
  );
}
