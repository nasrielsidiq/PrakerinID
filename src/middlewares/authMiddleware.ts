import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
  // cara bener baca cookie di middleware
  const token = req.cookies.get("userToken")?.value;

  if (!token) {
    if (
      req.nextUrl.pathname === "/masuk" ||
      req.nextUrl.pathname === "/daftar"
    ) {
      return null;
    }
    return NextResponse.redirect(new URL("/masuk", req.url));
  }

  if (req.nextUrl.pathname === "/masuk" || req.nextUrl.pathname === "/daftar") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  console.log("✅ Token kapanggih:", token);
  return null;
}
