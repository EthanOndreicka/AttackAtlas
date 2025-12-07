/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export (GitHub Pages)
  },
  // If deploying to a custom domain or user page (username.github.io), keep basePath empty.
  // If deploying to a project page (username.github.io/repo-name), uncomment and set the repo name:
  // basePath: '/attack-atlas', 
}

module.exports = nextConfig
