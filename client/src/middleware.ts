import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["main/dashboard", "/main"];
const authRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("auth-token")?.value;

  // 1. Redirect logged-in users away from auth pages
  if (authRoutes.includes(path) && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Protect dashboard/main routes
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    if (!authToken) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("from", path); // Store original destination
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/dashboard", "/login", "/register", "/"], // adjust as needed
};
