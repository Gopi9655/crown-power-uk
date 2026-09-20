import type { NextConfig } from "next";
const aliases: Record<string, string> = {
  "/bess": "/products/bess",
  "/gridtransformer": "/products/smart-grid-transformer",
  "/ourproducts": "/products/battery-products",
  "/meet-the-team": "/team",
  "/why-go-solar": "/why-green-energy",
  "/businesspartnercontractor": "/partners",
  "/statements-announcements": "/announcements",
  "/health-and-safety": "/health-safety",
  "/legaldepartment": "/legal",
  "/privacy-policy": "/privacy",
  "/cookie-policy": "/cookies",
  "/terms-conditions": "/terms",
};
const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return Object.entries(aliases).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};
export default nextConfig;
