type ExtractPayloadOptions = {
  ignoreExpiration?: boolean;
  audience?: string | string[];
  issuer?: string | string[];
  [key: string]: any;
};

type JwtPayload = {
  id: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string | string[];
  [key: string]: any;
};
