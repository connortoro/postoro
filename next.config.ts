import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com', "www.shutterstock.com", "postoro-images.s3.us-west-2.amazonaws.com", "gravatar.com"], // Add the correct domain
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    }
  },
};

export default nextConfig;
