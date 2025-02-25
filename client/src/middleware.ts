import { type NextRequest, NextResponse } from "next/server";

import { auth0 } from "./lib/auth0";

const publicRoutes = ["/"];
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  const session = await auth0.getSession(request);

  if (!session && isProtectedRoute) {
    // user is not authenticated, redirect to login page if they go into dashboard
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin)
    );
  }

  if (session && isPublicRoute) {
    // user is authenticated and in public route, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // the headers from the auth middleware should always be returned
  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
