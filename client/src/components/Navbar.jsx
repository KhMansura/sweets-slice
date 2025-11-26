"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            🧁SweetSlice
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>

            {/* Theme toggle */}
            <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {status === "loading" ? (
              <div className="h-8 w-24 bg-base-300 rounded animate-pulse"></div>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost flex items-center gap-2"
                >
                  <FaUserCircle className="text-xl" />
                  <span>{session.user?.name?.split(" ")[0] || "Account"}</span>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
                >
                  <li className="px-2 py-1 text-sm text-base-content/70">
                    {session.user?.email}
                  </li>
                  <li>
                    <Link href="/add-product">➕ Add Product</Link>
                  </li>
                  <li>
                    <Link href="/manage-products">🛠️ Manage Products</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-error"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="btn btn-ghost btn-circle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button
              className="md:hidden btn btn-ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-base-200 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-2 hover:bg-base-200 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-base-200 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-base-200 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {session ? (
              <>
                <Link
                  href="/add-product"
                  className="block px-4 py-2 hover:bg-base-200 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Product
                </Link>
                <Link
                  href="/manage-products"
                  className="block px-4 py-2 hover:bg-base-200 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Products
                </Link>
                <button
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: "/" });
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-error hover:bg-base-200 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 btn btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 btn btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
