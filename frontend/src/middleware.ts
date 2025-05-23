import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // /spaces/register 경로를 /host/space/register로 리다이렉션
  if (request.nextUrl.pathname === "/spaces/register") {
    return NextResponse.redirect(new URL("/host/space/register", request.url));
  }

  return NextResponse.next();
}
