import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["fr", "en"] as const;
const defaultLocale = "en";

function getLocale(pathname: string) {
  return locales.find((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    // Ignore public files and API
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const localeInPath = getLocale(pathname);
  if (!localeInPath) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
