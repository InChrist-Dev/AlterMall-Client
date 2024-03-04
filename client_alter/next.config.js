/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    swcMinify: true,
    // async rewrites() {
    //   return [
    //     {
    //       source: "/:path*",
    //       destination: "http://localhost:3000/:path*",
    //     },
    //   ];
    // },
  };
  


module.exports = nextConfig
