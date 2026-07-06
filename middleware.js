import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
// import { auth as nextAuthMiddleware } from "@/auth"; // For when switching to Auth.js

const isProtectedRouter= createRouteMatcher([
    "/dashboard(.*)",
    "resume(.*)",
     "interview(.*)",
      "ai-cover-letter(.*)",
       "onboarding(.*)", 
        
])

export default clerkMiddleware( async(auth,req)=>{
   const {userId} =await auth()
   if(!userId && isProtectedRouter(req)){
    const {redirectToSignIn}=await auth();
    return redirectToSignIn();
   }
   return NextResponse.next();
});

/* 
// --- AUTH.JS MIDDLEWARE IMPLEMENTATION (Pending full migration) ---
// export default nextAuthMiddleware((req) => {
//   const isLoggedIn = !!req.auth;
//   const isProtected = isProtectedRouter(req);
//   
//   if (!isLoggedIn && isProtected) {
//     return NextResponse.redirect(new URL("/login-custom", req.nextUrl));
//   }
//   return NextResponse.next();
// });
*/

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};