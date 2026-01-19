"use client";

export const register = async ({ email }: { email: string }) => {
  const regResult = await fetch(
    process.env.NEXT_PUBLIC_API_PAGE + "/api/auth/register",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  const data = await regResult.json();

  return data;

  /*
   * {
   *    ok: boolean;
   *    statusCode: number;
   *    statusMessage: string;
   *    data: any;
   * }
   */
};

export const login = async ({
  email,
  password = undefined,
}: {
  email: string;
  password?: string;
}) => {
  const logResult = await fetch(
    process.env.NEXT_PUBLIC_API_PAGE + "/api/auth/login",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await logResult.json();

  return data;

  /*
   * {
   *    ok: boolean;
   *    statusCode: number;
   *    statusMessage: string;
   *    data: any;
   * }
   */
};
