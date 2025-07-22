import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();

  const nextUrl = new URL("/login", url);

  nextUrl.searchParams.set("error", "invalid_token");

  (await cookies()).delete("token");

  return NextResponse.redirect(nextUrl);
}
