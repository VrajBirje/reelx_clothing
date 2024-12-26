import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    "/",
    "/shop",
    "/about",
    "/cart",
    "/privacy-policy",
    "/terms",
    "/api/webhook",
    "/sign-in",  
    "/sign-up"
  ],
  ignoredRoutes: [
    "/api/webhook"
  ]
});
 
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
 