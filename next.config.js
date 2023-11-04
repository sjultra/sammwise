module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    path: process.env.NEXT_PUBLIC_BASE_PATH || '',
  },

  publicRuntimeConfig: {
    webSocketBasePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  }
};
