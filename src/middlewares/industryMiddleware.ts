// middlewares/roleMiddleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function industryMiddleware(req: NextRequest) {
  const role = req.cookies.get("authorization")?.value;
  if (role !== "company") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }
  return null;
}
