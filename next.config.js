module.exports = {
  basePath: process.env.NEXT_BASE_PATH || '',
  assetPrefix: process.env.RANCHER_SERVER || '',
  hostname: process.env.RANCHER_SERVER,
  // images: {
  //   path: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // },

  publicRuntimeConfig: {
    hmrEndpoint: 'wss://'+process.env.RANCHER_SERVER+process.env.NEXT_PUBLIC_BASE_PATH,
    webSocketBasePath: 'wss://'+process.env.RANCHER_SERVER+process.env.NEXT_PUBLIC_BASE_PATH,
  }
};
