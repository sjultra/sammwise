module.exports = {
  // basePath: '/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy' || process.env.NEXT_BASE_PATH || '',
  // assetPrefix: process.env.NEXT_BASE_PATH || '',

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
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        // source: '/:path*',
        source: '/',
        destination: '/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http%3Asammwise%3A80/proxy/',
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/about',
        destination: '/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http%3Asammwise%3A80/proxy/about',
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/assessment',
        destination: '/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http%3Asammwise%3A80/proxy/assessment',
      },
      {
        has: [
          {
            type: 'host',
            value: 'rancher.vzxy.net',
          },
        ],
        source: '/results',
        destination: '/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http%3Asammwise%3A80/proxy/results',
      },
    ]
  }
}


