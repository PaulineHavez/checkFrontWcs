/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:4000/graphql/:path*", // Proxy to Backend
      },
    ];
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "http://back-end:4000/:path*", // Proxy to Backend
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
