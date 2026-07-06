/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['playwright-core', '@sparticuz/chromium'],
  turbopack: {},
};

export default nextConfig;
