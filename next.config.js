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
      // {
      //   source: '/',
      //   destination: process.env.RANCHER_SERVER+process.env.NEXT_BASE_PATH // Proxy to Backend
      // },
      {
        has: [
          {
            type: 'host',
            value: 'https://rancher.vzxy.net' || process.env.RANCHER_SERVER,
          },
        ],
        source: '/:path*',
        destination: '/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy/:path*' || process.env.RANCHER_SERVER,
        // basePath: false,
      },
    ]
  }
}


