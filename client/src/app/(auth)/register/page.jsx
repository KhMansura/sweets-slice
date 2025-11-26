// ✅ src/app/(auth)/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // ✅ Registration success → redirect to login
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md p-6 bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label"><span className="label-text">Full Name</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="btn bg-black text-white border-black w-full flex items-center justify-center gap-2"
        >
          {/* GitHub logo */}
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42..."></path>
          </svg>
          Register with GitHub
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary">Login here</Link>
        </p>
      </div>
    </div>
  );
}
