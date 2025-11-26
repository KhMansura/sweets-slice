// 📁 src/app/api/auth/[...nextauth]/route.js
// import authOptions from '@/lib/auth.config';

// export { authOptions as GET, authOptions as POST };
import { authOptions } from "@/lib/auth.config";
import NextAuth from "next-auth";
// import authOptions from "@/lib/auth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };