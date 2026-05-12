import { NextResponse } from "next/server";

export function middleware(request) {

  const token =
    request.cookies.get("token");

  const pathname =
    request.nextUrl.pathname;

  // PUBLIC ROUTES
  const publicRoutes = [
    "/login",
    "/register",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  // NOT LOGGED IN
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/teacher/:path*",
    "/admin/:path*",
    "/superadmin/:path*",
  ],
};