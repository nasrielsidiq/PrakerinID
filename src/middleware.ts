import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const authResult = authMiddleware(req, path);
  if (authResult !== true) return authResult;

  const authorization = req.cookies.get("authorization")?.value;

  if (
    authorization === "super_admin" &&
    (adminAccess.includes(path) || path.startsWith("/dashboard/master-data"))
  ) {
    return NextResponse.next();
  }

  if (
    authorization === "company" &&
    (companyAccess.includes(path) || path.startsWith("/dashboard/industry"))
  ) {
    return NextResponse.next();
  }

  if (authorization === "school" && schoolAccess.includes(path)) {
    return NextResponse.next();
  }

  if (authorization === "student" && studentAccess.includes(path)) {
    return NextResponse.next();
  }

  return NextResponse.next();
  // return NextResponse.redirect(new URL("/dashboard", req.url));
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/masuk", "/daftar"],
};

const adminAccess = [
  "/dashboard",
  "/dashboard/isi-halaman",
  "/dashboard/perusahaan",
  "/dashboard/sekolah",
  "/dashboard/penghargaan",
  "/dashboard/penghargaan/tambah",
  "/dashboard/penghargaan/berikan",
  "/dashboard/profile",
];

const companyAccess = ["/dashboard", "/dashboard/profile"];

const schoolAccess = ["/dashboard", "/dashboard/profile"];

const studentAccess = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/lowwongan",
  "/dashboard/lowwongan/archive",
  "/dashboard/cv",
];
