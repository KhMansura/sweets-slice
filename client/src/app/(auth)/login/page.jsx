// import React from 'react'

// export default function Loginpage() {
//   return (
//     <div>
//       this is login
//     </div>
//   )
// }
// 'use client'
// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'


// export default function LoginPage(){
// const [email,setEmail] = useState('')
// const [password,setPassword] = useState('')
// const router = useRouter()


// async function submit(e){
// e.preventDefault()
// const res = await signIn('credentials', { redirect: false, email, password })
// if(res?.ok) router.push('/')
// else alert('Login failed')
// }


// return (
// <div className="max-w-md mx-auto">
// <h2 className="text-2xl mb-4">Login</h2>
// <form onSubmit={submit} className="space-y-3">
// <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="input" />
// <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="input" />
// <button className="btn" type="submit">Login</button>
// </form>
// <div className="mt-4">Or</div>
// <div className="mt-2">
// <button onClick={()=>signIn('github')} className="btn">Login with GitHub</button>
// </div>
// </div>
// )
// }
// ✅ src/app/(auth)/login/page.jsx

'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push('/');
    } else {
      setError(result?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md p-6 bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Login to SweetSlice</h1>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider">OR</div>

        {/* GitHub Button */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="btn bg-black text-white border-black w-full flex items-center justify-center gap-2"
        >
          <svg 
            aria-label="GitHub logo" 
            width="16" 
            height="16" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
          >
            <path 
              fill="white" 
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            ></path>
          </svg>
          Login with GitHub
        </button>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link href="/register" className="link link-primary">Register here</Link>
        </p>
      </div>
    </div>
  );
}