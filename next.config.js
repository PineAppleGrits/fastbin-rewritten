const path = require('path');
// next.config.js
module.exports = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles')
    ]
  },

  async rewrites() {
    return [
      {
        source: '/documents',
        destination: '/api/documents'
      },
      {
        source: '/documents/:key',
        destination: '/api/documents/:key'
      },
      {
        source: '/raw/:key',
        destination: '/api/documents/:key/raw'
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/languages/:language',
        destination: '/?language=:language',
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
