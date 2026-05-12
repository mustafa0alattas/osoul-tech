import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ar/6", destination: "/ar", permanent: true },
      { source: "/en/6", destination: "/en", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
