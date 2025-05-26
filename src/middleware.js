import { NextResponse } from 'next/server';
export function middleware(request) {
  const token =
    request.cookies.get('pilotNo')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value;

  console.log("token from middleware", token);

  const isAuth = Boolean(token);

  // Redirect only if NOT authenticated
  if (!isAuth) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow authenticated users to access the route
  return NextResponse.next();
}

export const config = {
  // Applies only to the homepage
  matcher: ['/'], 
};
