import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes: string[] = [];

export async function updateSession(request: NextRequest) {
  console.log(Array(10).join("-"), "Reading Middleware");
  const cookies = request.cookies.getAll();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const isAuth = !!cookies.find(({ name }) => name === "token");
  console.log(Array(10).join("-"), "isAuth", isAuth);

  const isAuthRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute && !isAuth) {
    console.log(Array(10).join("-"), "Redirecting non authenticated user..."); // TODO: removable
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log(Array(10).join("-"), "Closing Middleware");
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
