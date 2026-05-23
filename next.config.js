/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
      "media-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig = {
  output: isProduction ? 'export' : undefined,
  basePath: isProduction ? '/Narayanan-Portfolio' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['app'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  assetPrefix: isProduction ? '/Narayanan-Portfolio/' : '',
  poweredByHeader: false,
  // headers() is incompatible with output:'export' — only applied in dev/server (Docker) mode
  ...(!isProduction && {
    async headers() {
      return [{ source: '/(.*)', headers: securityHeaders }];
    },
  }),
};

module.exports = nextConfig;
