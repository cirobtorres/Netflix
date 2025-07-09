import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*", // ← qualquer chamada para /api
        destination: "http://localhost:3001/api/:path*", // redireciona pro Nest
      },
    ];
  },
};

export default nextConfig;
