// import Link from "next/link";
// import React from "react";

// export default function Navbar() {
//   const links =<>
//       <Link href="/" className="px-4">
//         Home
//       </Link>
//       <Link href="/products" className="px-4">
//         Products
//       </Link>
//       <Link href="/about" className="px-4">
//         About us
//       </Link>
//       <Link href="/login" className="px-4">
//         Login
//       </Link>
//       <Link href="/register" className="px-4">
//         Register
//       </Link>
//   </>
//   return (
//     <div className="flex justify-center py-4">
//   <div className="navbar bg-base-100 shadow-sm">
//   <div className="navbar-start">
//     <div className="dropdown">
//       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//       </div>
//       <ul
//         tabIndex="-1"
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         {links}
//       </ul>
//     </div>
//     <a className="btn btn-ghost text-xl">daisyUI</a>
//   </div>
//   <div className="navbar-center hidden lg:flex">
//     <ul className="menu menu-horizontal px-1">
     
//      {links}
//     </ul>
//   </div>
//   <div className="navbar-end">
//     <a className="btn">Button</a>
//   </div>
// </div>
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          
          <Link href="/" className="text-xl font-bold">🧁SweetSlice</Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>

            {status === 'loading' ? (
              <div className="h-8 w-24 bg-base-300 rounded animate-pulse"></div>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost">
                  {session.user?.name?.split('')[0] || 'Account'}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
                >
                  <li><Link href="/add-product">➕Add Product</Link></li>
                  <li><Link href="/manage-products">🛠️Manage Products</Link></li>
                  <li><button onClick={() => signOut()} className="text-error">Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-base-200 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/products" className="block px-4 py-2 hover:bg-base-200 rounded" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-base-200 rounded" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-base-200 rounded" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {session ? (
              <>
                <Link href="/add-product" className="block px-4 py-2 hover:bg-base-200 rounded" onClick={() => setIsMenuOpen(false)}>Add Product</Link>
                <Link href="/manage-products" className="block px-4 py-2 hover:bg-base-200 rounded" onClick={() => setIsMenuOpen(false)}>Manage Products</Link>
                <button
                  onClick={() => { signOut(); setIsMenuOpen(false); }}
                  className="block px-4 py-2 text-error hover:bg-base-200 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 btn btn-outline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/register" className="block px-4 py-2 btn btn-primary" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
