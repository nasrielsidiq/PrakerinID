import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";
import { industryMiddleware } from "./middlewares/industryMiddleware";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered:", req.nextUrl.pathname);
  // ...rest of code
  const path = req.nextUrl.pathname;

  const authResult = authMiddleware(req);
  console.log("Auth middleware result:", authResult);

  if (authResult) return authResult;

  if (path.startsWith("/dashboard/industry")) {
    console.log("middleware industry triggered:", req.nextUrl.pathname);

    const industryResult = industryMiddleware(req);
    if (industryResult) return industryResult;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/masuk",
    "/daftar",
  ],
};
