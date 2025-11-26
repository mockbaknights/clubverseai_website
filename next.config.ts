import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optimized for AWS deployment
  // Use "standalone" for AWS Amplify (recommended)
  // Use "export" for static S3 + CloudFront deployment
  output: "standalone",
  // Compress output for better performance
  compress: true,
  // Optimize images
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
