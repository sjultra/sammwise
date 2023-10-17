module.exports = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy/' // Proxy to Backend
        },
        {
          source: '/about',
          destination: '/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy/about' // Proxy to Backend
        },
        {
          source: '/assessment',
          destination: '/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy/assessment' // Proxy to Backend
        },
        {
          source: '/results',
          destination: '/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy/results' // Proxy to Backend
        }
      ]
    }
  }