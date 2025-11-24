// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <div>Hello</div>
//     </div>
//   );
// }
// import { useEffect, useState } from 'react';
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter only "Cakes" and take first 6 (or most popular)
        const cakes = data.filter((p) => p.category === "Cakes");
        setBestSellers(cakes.slice(0, 6));
      });
  }, []);
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 -left-10 w-32 h-32 bg-pink-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-3xl">🧁</span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Sweet<span className="text-pink-600">Slice</span>
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Handcrafted Desserts,{" "}
                <span className="text-purple-600">Made with Love </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Freshly baked cakes, donuts, and tarts — delivered warm to your
                doorstep. All made with local ingredients and traditional
                recipes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="btn bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg"
                >
                  🍰 Order Now
                </Link>
                <Link
                  href="/about"
                  className="btn bg-white border border-purple-400 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
                >
                  🌷 Our Story
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                <span>🚚 Free delivery in Dhaka</span>
                <span>⏱️ Order 24h ahead</span>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-yellow-200 rounded-2xl -z-10 transform rotate-3"></div>
                <img
                  src="https://i.ibb.co.com/b5Sm8P5w/COLOURBOX27464285.webp"
                  alt="Assorted SweetSlice desserts: chocolate cake, cupcakes, and donuts"
                  className="relative z-10 rounded-2xl shadow-xl w-full max-w-md"
                />
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  Best Seller!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== Best Sellers Section ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🏆 Our <span className="text-pink-600">Best Sellers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Loved by thousands of customers in Dhaka — fresh, delicious, and
              always made with care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="card bg-white border border-pink-100 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden"
              >
                <figure className="h-48 overflow-hidden bg-vanilla-50">
                  <img
                    src={`${product.image}?auto=compress&cs=tinysrgb&w=400`}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="badge badge-sm badge-secondary">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.shortDesc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-pink-600">
                      {product.price}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products?category=Cakes"
              className="btn bg-pink-500 hover:bg-pink-600 text-white px-6 py-3"
            >
              🎂 View All Cakes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
