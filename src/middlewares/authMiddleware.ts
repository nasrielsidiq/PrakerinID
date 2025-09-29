import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(
  req: NextRequest,
  path: string
): NextResponse | true {
  const token = req.cookies.get("userToken")?.value;

  if (!token) {
    if (path === "/masuk" || path === "/daftar") {
      return true;
    }
    return NextResponse.redirect(new URL("/masuk", req.url));
  }

  if (path === "/masuk" || path === "/daftar") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return true;
}
