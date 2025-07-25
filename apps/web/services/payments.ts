interface CookieData {
  [key: string]: string;
}

interface CookieOptions {
  path?: string;
  maxAge?: number;
  httpOnly?: boolean;
}

export const setCookies = async (
  theCookies: CookieData,
  cookieOptions: CookieOptions
): Promise<void> => {
  await fetch("/api/set-cookies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theCookies, cookieOptions }),
  });
};

export const delCookies = async (theCookies: string): Promise<void> => {
  await fetch("/api/del-cookies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theCookies }),
  });
};
