/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: "/:path*",
          destination: "https://udtown.site/:path*",
        },
      ];
    },
  };
  


module.exports = nextConfig
