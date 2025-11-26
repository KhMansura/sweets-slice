// src/lib/auth.config.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// import CredentialsProvider from 'next-auth/'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // ✅ Call YOUR Express backend to login & get real JWT
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Invalid credentials");
          }

          // ✅ Return real user + JWT token from backend
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.token, // ⚠️ This MUST match backend's JWT
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // First login → `user` exists, attach token/user data
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.accessToken = token.accessToken; // ✅ Available in client components
      return session;
    },

    redirect({ url, baseUrl }) {
      // Allow redirects only within app
      if (url.startsWith("/")) return url;
      return baseUrl;
    },
  },

  // 🔑 Critical: Must match JWT_SECRET in your .env
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);