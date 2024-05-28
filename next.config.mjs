/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_URL_HOSTNAME,
        port: "",
        pathname: process.env.IMAGE_URL_PATHNAME,
      },
    ],
  },
};

export default nextConfig;
