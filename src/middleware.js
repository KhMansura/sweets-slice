import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const user =true;
  if(!user){
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/add-product", "/manage-products"],//dashboard/manage-product
}
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/login",
//   },
// });

// export const config = {
//   matcher: ["/add-product", "/manage-products"],
// };