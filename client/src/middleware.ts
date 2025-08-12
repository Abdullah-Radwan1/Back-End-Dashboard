import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const protectedRoutes = ["/main", "/dashboard"];
const authRoutes = ["/auth/login", "/auth/register"];

export default async function middleware(request: NextRequest) {
  //current path
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("auth-token")?.value;

  // 1. Redirect logged-in users away from auth pages
  if (authRoutes.includes(path) && authToken) {
    // Optional: You might want to verify the token is valid here
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  // // 2. Protect dashboard/main routes
  // if (protectedRoutes.some((route) => path.startsWith(route))) {
  //   if (!authToken) {
  //     const loginUrl = new URL("/auth/login", request.url);
  //     loginUrl.searchParams.set("from", path); // Store original destination
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   // Optional: Verify token is valid here
  //   // If invalid, clear cookie and redirect to login
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main/:path*",
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
