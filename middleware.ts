import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    "/",
    "/shop",
    "/about",
    "/cart",
    "/privacy-policy",
    "/terms",
    "/api/webhook"
  ],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/";

      if (auth.userId) {
        path = `/`;
      }

      const pathSelection = new URL(path, req.url);
      return NextResponse.redirect(pathSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
    //   const orgSelection = new URL("/select-org", req.url);
    //   return NextResponse.redirect(orgSelection);
    // }
  }
});
 
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
 