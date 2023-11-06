module.exports = {
  basePath: process.env.NEXT_BASE_PATH || '',
  assetPrefix: process.env.NEXT_BASE_PATH || '',

  // assetPrefix: process.env.RANCHER_SERVER || '',
  // hostname: process.env.RANCHER_SERVER,
  // images: {
  //   path: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // },

  // publicRuntimeConfig: {
  //   hmrEndpoint: 'wss://'+process.env.RANCHER_SERVER+process.env.NEXT_PUBLIC_BASE_PATH,
  //   webSocketBasePath: 'wss://'+process.env.RANCHER_SERVER+process.env.NEXT_PUBLIC_BASE_PATH,
  // }


  async rewrites() {
    return [
      {
        source: '/',
        destination: process.env.NEXT_BASE_PATH // Proxy to Backend
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/',
        destination: process.env.NEXT_BASE_PATH // Proxy to Backend
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/about',
        destination: process.env.NEXT_BASE_PATH + '/about' // Proxy to Backend
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/assessment',
        destination: process.env.NEXT_BASE_PATH + '/assessment' // Proxy to Backend
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/results',
        destination: process.env.NEXT_BASE_PATH + '/results' // Proxy to Backend
      }
    ]
  }
}


