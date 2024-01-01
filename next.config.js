const withPWA = require('next-pwa')({
  dest: 'public',
  publicExcludes: ['!**/*'],
  buildExcludes: [/.*/],
  disable: process.env.NODE_ENV === 'development',
  // dynamicStartUrl: false,
  runtimeCaching: [
    {
      urlPattern: /inter-v3-latin-(regular|700|500).*(\.woff2|\.woff)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'inter font',
      },
    },
    {
      urlPattern: /oxygen-v10-latin-700.*(\.woff2|\.woff)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'oxygen font',
      },
    },
  ],
});

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
      },
    ],
  },
  swcMinify: true,
});
