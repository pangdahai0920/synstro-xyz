/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // SSG static export — required for Cloudflare Pages
  trailingSlash: true,    // ensures /products/ style URLs
  images: {
    unoptimized: true,    // static export requires unoptimized images
  },
}

module.exports = nextConfig
