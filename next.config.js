/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    // loader: 'cloudinary',
    // path: ''
  },
  trailingSlash: true,
}

module.exports = nextConfig
