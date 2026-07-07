/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['puppeteer-core', '@sparticuz/chromium-min'],
};

export default nextConfig;
