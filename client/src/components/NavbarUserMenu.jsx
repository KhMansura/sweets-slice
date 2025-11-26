// src/components/NavbarUserMenu.jsx
'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavbarUserMenu() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/login" className="btn btn-ghost">Login</Link>
        <Link href="/register" className="btn btn-primary">Register</Link>
      </div>
    );
  }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        {session.user?.name || session.user?.email}
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 shadow">
        <li><Link href="/add-product">Add Product</Link></li>
        <li><Link href="/manage-products">Manage Products</Link></li>
        <li><button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button></li>
      </ul>
    </div>
  );
}