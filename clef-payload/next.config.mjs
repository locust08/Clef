import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withPayload } from '@payloadcms/next/withPayload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storefrontOrigin = (() => {
  const configured = process.env.STOREFRONT_URL
  if (!configured) {
    return process.env.NODE_ENV === 'production' ? null : 'http://localhost:3000'
  }

  try {
    return new URL(configured).origin
  } catch {
    throw new Error('STOREFRONT_URL must be a valid URL origin')
  }
})()

// Shared by local Next development and the OpenNext Cloudflare build.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Match Payload's official Cloudflare template. These packages contain
  // workerd-specific runtime code and must not be folded into Next's server
  // bundle as ordinary Node packages.
  serverExternalPackages: ['jose', 'pg-cloudflare'],
  async redirects() {
    return [
      {
        source: '/admin/login',
        destination: '/clef-login',
        permanent: false,
      },
      {
        source: '/',
        destination: '/admin',
        permanent: false,
      },
    ]
  },
  async headers() {
    const noStoreHeaders = [
      {
        key: 'Cache-Control',
        value: 'private, no-cache, no-store, max-age=0, must-revalidate',
      },
    ]
    const adminHeaders = [
      ...noStoreHeaders,
      {
        key: 'Content-Security-Policy',
        value: `frame-src 'self'${storefrontOrigin ? ` ${storefrontOrigin}` : ''}`,
      },
    ]

    return [
      { source: '/admin/:path*', headers: adminHeaders },
      { source: '/api/users/:path*', headers: noStoreHeaders },
      { source: '/clef-login/:path*', headers: noStoreHeaders },
    ]
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.shuffle.dev',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
