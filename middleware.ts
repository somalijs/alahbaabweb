import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Auth from "./lib/auth/Auth";

export async function middleware(request: NextRequest) {
  const auth = await Auth();  // Assuming Auth() returns an object with isLoggedIn property
  const url = request.url;

  // If the user is not logged in, redirect to login page
  if (!auth?.isLoggedIn) {
    // Ensure we're only redirecting to /login if the current page is not /login already
    if (!url.includes("/login")) {
      return NextResponse.redirect(new URL("/login", url));
    }
  } else {
    // If the user is logged in and trying to access the login page, redirect to profile
    if (url.includes("/login")) {
      return NextResponse.redirect(new URL("/profile", url));
    }
  
      return NextResponse.next(); 
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}

// Config to match specific paths
export const config = {
  matcher: ["/profile", "/login"],  // Match both profile and login routes
};
