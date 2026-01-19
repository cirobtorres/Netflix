import { NextRequest, NextResponse } from "next/server";

interface CookieData {
  [key: string]: string;
}

interface CookieOptions {
  path?: string;
  maxAge?: number;
  httpOnly?: boolean;
}
export async function POST(request: NextRequest) {
  const {
    theCookies,
    cookieOptions,
  }: { theCookies: CookieData; cookieOptions: CookieOptions } =
    await request.json();

  const response = NextResponse.json({ status: "ok" });

  for (const [key, config] of Object.entries(theCookies)) {
    response.cookies.set(key, config, {
      path: cookieOptions.path || "/",
      maxAge: cookieOptions.maxAge ?? 60 * 60 * 24,
      httpOnly: cookieOptions.httpOnly ?? false,
    });
  }

  return response;
}
