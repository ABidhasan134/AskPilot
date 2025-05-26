import { NextResponse } from 'next/server'

// Middleware function
export function middleware(request) {
  const token =
    request.cookies.get('pilotNo')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value; 
  // console.log("token from middleware",token)
  const isAuth = Boolean(token);
  const isAuthPage = request.nextUrl.pathname === '/sign-up';

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL('/sign-up', request.url));
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-up).*)',
  ],
};
