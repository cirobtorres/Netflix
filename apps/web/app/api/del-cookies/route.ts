import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { theCookies }: { theCookies: string } = await request.json();

  const response = NextResponse.json({ status: "ok" });

  response.cookies.delete(theCookies);

  return response;
}
