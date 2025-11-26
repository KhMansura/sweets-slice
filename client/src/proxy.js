
// src/proxy.js
import { withAuth } from "next-auth/middleware"; // ✅ Keep this — it's correct!

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/add-product", "/manage-products"],
};