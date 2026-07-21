import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDevelopment = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    // Payload serves uploaded media from the sibling app on localhost in
    // development. Next blocks private-IP image optimization by default.
    dangerouslyAllowLocalIP: isDevelopment,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.shuffle.dev',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      ...(isDevelopment
        ? [
            {
              protocol: 'http',
              hostname: 'localhost',
            },
          ]
        : []),
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
