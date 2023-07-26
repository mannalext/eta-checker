module.exports = {
  basePath: '/eta-checker',
  async headers() {
    return [
      {
        // Match the route of your API route
        source: '/eta-checker/api/directions',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'alexmann.dev',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};