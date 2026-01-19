import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes: string[] = [];

export async function updateSession(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const isAuth = !!cookies.find(({ name }) => name === "token");

  const isAuthRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const getUser = async (token: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_PAGE + "/api/auth/me",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const user = await response.json();

  return user;
};

export const updatePassword = async ({
  token,
  data,
}: {
  token: RequestCookie;
  data: { password: string };
}) => {
  const updPassword = await fetch(
    process.env.NEXT_PUBLIC_API_PAGE + "/api/auth/update",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ password: data.password }),
    }
  );

  const updUser = await updPassword.json();

  return updUser;
};
