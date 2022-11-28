/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["million-studio.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
