/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/auth/:any*',
        destination: '/auth',
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'core'],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      fs: false,
      http2: false,
      tls: false,
      net: false,
      dns: false,
      'cache-manager': false,
      repl: false,
      kafkajs: false,
      mqtt: false,
      nats: false,
      ioredis: false,
      'amqp-connection-manager': false,
      child_process: false,
      cloudinary: false,
      '@nestjs': false,
      perf_hooks: false,
      handlebars: false,
      'mongodb-client-encryption': false,
      snappy: false,
      '@aws-sdk/credential-providers': false,
      '@mongodb-js/zstd': false,
      kerberos: false,
      request: false,
      'firebase-admin': false,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: 'handlebars/dist/handlebars.js',
      cloudinary: 'cloudinary/lib/cloudinary.js',
      'firebase-admin': 'firebase-admin/app',
    };
    return config;
  },
};
