import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDevelopment = process.env.NODE_ENV === 'development'

const getRemoteImagePattern = (value) => {
  if (!value) return null

  try {
    const url = new URL(value)

    return url.protocol === 'https:'
      ? {
          protocol: 'https',
          hostname: url.hostname,
        }
      : null
  } catch {
    return null
  }
}

const payloadImagePattern = getRemoteImagePattern(
  process.env.NEXT_PUBLIC_PAYLOAD_URL,
)
const payloadAdminOrigin = (() => {
  const configured =
    process.env.PAYLOAD_ADMIN_ORIGIN || process.env.NEXT_PUBLIC_PAYLOAD_URL

  if (!configured) return isDevelopment ? 'http://localhost:3001' : null

  try {
    return new URL(configured).origin
  } catch {
    throw new Error('PAYLOAD_ADMIN_ORIGIN must be a valid URL origin')
  }
})()

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
      ...(payloadImagePattern ? [payloadImagePattern] : []),
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
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self'${payloadAdminOrigin ? ` ${payloadAdminOrigin}` : ''}`,
          },
        ],
      },
    ]
  },
}

export default nextConfig
